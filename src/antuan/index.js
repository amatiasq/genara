'use strict';
const { random, randomItem, wait } = require('../util');
const Bot = require('../bot');
const insults = require('./insultos.json');
const seconds = 10;


class Antuan extends Bot {

    async fight(message, type, level = 'normal') {
        const category = insults[type];

        if (!category) {
            return message.reply('Algo ha petado :\\');
        }

        const insult = randomItem(category);
        let attack = insult[level];
        
        if (!attack) {
            return message.reply('Algo ha petado mucho :(');
        }

        if (Array.isArray(attack)) {
            attack = randomItem(attack);
        }

        const id = Math.random();
        const index = category.indexOf(insults);
        const answers = [];

        while (answers.length < 4) {
            const { answer } = randomItem(category);
            if (answer !== insult.answer && !answers.includes(answer))
                answers.push(answer);
        }

        const rightAnswer = random(0, 4);
        answers.splice(rightAnswer, 0, insult.answer);

        await this.memory.edit('current-fights', (value = {}) => Object.assign(value, {
            [message.author]: {
                id,
                index,
                answer: rightAnswer + 1,
            },
        }));

        setTimeout(async () => {
            if (await this.endFight(message.author, id)) {
                message.reply('Demasiado lento. Vuelve cuando estés a mi altura.');
            }
        }, seconds * 1000);

        const options = answers.map((answer, index) => `${index + 1} - ${answer}`);
        return message.reply(`En garde!\n${attack}\n\n${options.join('\n')}\n\nTienes ${seconds} segundos!`);
    }

    async endFight(author, id) {
        let wasRemoved = false;

        await this.memory.edit('current-fights', (value = {}) => {
            const entry = value[author];

            if (entry && entry.id === id) {
                delete value[author];
                wasRemoved = true;
            }

            return value;
        });

        return wasRemoved;
    }

}


const antuan = new Antuan([
    'antuan'
], {
    id: '389753947780546563',
    directory: './antuan',
    isHearBotEnabled: false,
    isHearSelfEnabled: false,

    async unhandled(bot, message) {
        return message.reply(randomItem([
            'No prefieres ver tetas?',
        ]));
    }
});

antuan.command('hola', async(bot, message) => message.channel.send('Hola, soy Antuán'));
antuan.command('dame el link', async(bot, message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=391243528799387652&scope=bot&permissions=281664'));
antuan.command('di ', async(bot, message, text) => message.channel.send(text));

antuan.alias('help', 'ayuda');
antuan.alias('peleemos', 'pelea');
antuan.alias('en garde', 'pelea');
antuan.alias('mira como tiemblo', 'pelea');
antuan.alias('no queda alcohol', 'pelea');

module.exports = antuan;
