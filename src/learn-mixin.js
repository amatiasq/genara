const { randomItem } = require('./util');

module.exports = (BotSubclass) => {
    return class LearnMixin extends BotSubclass {

        async learnWhoIs(user, value) {
            return this.memory.edit('who', (who = {}) => {
                who[user] = value;
                return who;
            });
        }

        whoIs(user) {
            return this.memory.get('who', {})[user] || null;
        }

        async learn(type, nick, value) {
            return this.memory.edit(`learnt-${type}`, (entries = []) => {
                return [ ...entries, `${value} (by ${nick})` ];
            });
        }

        getLearnt(type, index = null) {
            const list = this.memory.get(`learnt-${type}`) || [];

            return index == null
                ? randomItem(list)
                : list[index];
        }

        count(type) {
            return this.memory.get(`learnt-${type}`, []).length;
        }

    };
};
