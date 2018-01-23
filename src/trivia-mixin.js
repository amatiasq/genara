const { randomItem, random } = require('./util');
const MILLISECONDS_IN_SECONDS = 1000;
const SECONDS_IN_MINUTES = 60;
const MINUTES_IN_HOURS = 60;
const HOURS_IN_DAY = 24;
const MAX_ANSWERS = 5;
const MIN_ANSWERS = 3;
const MAX_SECONDS = 20;
const MIN_SECONDS = 4;
const MAX_ADVANTAGE = 1 / 4;

module.exports = (BotSubclass) => {
    return class TriviaMixin extends BotSubclass {

        constructor(prefixes, options) {
            super(prefixes, options);

            this.MAX_ANSWERS = options.MAX_ANSWERS || MAX_ANSWERS;
            this.MIN_ANSWERS = options.MIN_ANSWERS || MIN_ANSWERS;
            this.MAX_SECONDS = options.MAX_SECONDS || MAX_SECONDS;
            this.MIN_SECONDS = options.MIN_SECONDS || MIN_SECONDS;
        }

        // POINTS

        async addPoints(type, user, value) {
            return this.memory.edit(`points-${type}`, (points = {}) => {
                points[user] = this.getPoints(type, user) + value;
                return points;
            });
        }

        getPoints(type, user = null) {
            const points = this.memory.get(`points-${type}`) || {};

            if (user) {
                return points[user] || 0;
            }

            return Object.keys(points)
                .map(user => ({ user, points: points[user] }))
                .sort((first, second) => second.points - first.points);
        }

        async lowerPoints(type, operator) {
            const now = new Date();
            const lastLower = new Date(this.memory.get(`points-${type}-lower`) || 0);
            const diff = Math.round((now - lastLower) / MILLISECONDS_IN_SECONDS / SECONDS_IN_MINUTES) / MINUTES_IN_HOURS;

            if (diff < HOURS_IN_DAY) {
                return HOURS_IN_DAY - diff;
            }

            await this.memory.edit(`points-${type}`, (points = {}) => {
                for (const user of Object.keys(points)) {
                    points[user] = Math.ceil(points[user] * (1 - operator));
                }
                return points;
            });

            await this.memory.set(`points-${type}-lower`, Number(now));

            return null;
        }


        // TRIVIA

        async trivia(message, type, list, {
            target = message.author,
            maxAnswers = this.MAX_ANSWERS,
            minAnswers = this.MIN_ANSWERS,
            maxSeconds = this.MAX_SECONDS,
            minSeconds = this.MIN_SECONDS,
        } = {}) {
            const { index, question, answer } = this._getTriviaEntry(list);
            const [ top1, top2 ] = this.getPoints(type);
            const userPoints = this.getPoints(type, target);

            if (
                top1 && top2 &&
                userPoints === top1.points &&
                top1.points - top2.points > top1.points * MAX_ADVANTAGE
            ) {
                await message.reply(this.message('TOO_MANY_POINTS'));
                return null;
            }

            const diff = top1.points - userPoints;
            const seconds = diff <= 0 ? minSeconds : factor(top1.points, diff, maxSeconds, minSeconds + 1);
            const answerCount = factor(top1.points, userPoints, maxAnswers, minAnswers);
            const answers = this._getFakeAnswers(list, answerCount - 1, index);
            const rightAnswerPosition = random(answerCount - 1);

            await this._startTrivia(message, target, rightAnswerPosition + 1, seconds);
            answers.splice(rightAnswerPosition, 0, answer);

            return {
                options: answers.map((answer, index) => `${index + 1} - ${answer}`),
                question,
                seconds,
            };
        }

        async resolveTrivia(type, target, text) {
            const match = text.match(/\d+/);
            const response = match && parseInt(match[0], 10);

            if (response == null || isNaN(response)) {
                return null;
            }

            const stored = this.memory.get('running-trivia');
            const entry = stored && stored[target];

            if (!entry) {
                return null;
            }

            const success = response === entry.answer;

            await this._endTrivia(target, entry.id);

            if (!success) {
                return {
                    success: false,
                    expected: entry.answer,
                    actual: response,
                };
            }

            return { success: true };
        }

        async _startTrivia(message, target, answer, timeout) {
            const id = Math.random();

            await this.memory.edit('running-trivia', (value = {}) => {
                value[target] = { id, answer, time: new Date() };
                return value;
            });

            setTimeout(async() => {
                if (await this._endTrivia(target, id)) {
                    message.reply(this.message('TRIVIA_TIMEOUT'));
                }
            }, timeout * MILLISECONDS_IN_SECONDS);

            return id;
        }

        async _endTrivia(target, id) {
            const stored = this.memory.get('running-trivia') || {};
            const entry = stored[target];

            if (entry && entry.id === id) {
                delete stored[target];
                await this.memory.set('running-trivia', stored);
                return true;
            }

            return false;
        }

        _getTriviaEntry(list) {
            const entry = randomItem(list);
            const index = list.indexOf(entry);
            let { question, answer } = entry;

            if (Array.isArray(question)) {
                question = randomItem(question);
            }

            if (Array.isArray(answer)) {
                answer = randomItem(answer);
            }

            return { index, question, answer };
        }

        _getFakeAnswers(list, amount, questionIndex) {
            if (list.length - 1 < amount) {
                return list
                    .map(entry => entry.answer)
                    .splice(questionIndex, 1);
            }

            const answers = [];

            while (answers.length < amount) {
                const { index, answer } = this._getTriviaEntry(list);

                if (index !== questionIndex && !answers.includes(answer)) {
                    answers.push(answer);
                }
            }

            return answers;
        }
    };
};

function factor(top, current, max, min) {
    if (top === 0) {
        return Math.round(min + (max - min) / 2);
    }

    const diff = max - min;
    const modifier = diff / top * current;
    return Math.round(modifier + min);
}
