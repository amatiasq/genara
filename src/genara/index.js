'use strict';
const { randomItem } = require('../util');
const Bot = require('../bot').apply(
    require('../utils-mixin'),
    require('../learn-mixin'),
    require('../ignore-mixin'),
);


class Genara extends Bot {

    async insult(extra = []) {
        const list = await this.db.Learn.find({ type: 'insult' });

        return randomItem(list.concat(extra));
    }
}


const genara = new Genara([
    'genara',
    'gena',
], {
    id: '389753947780546563',
    directory: './genara',
    isHearBotEnabled: true,
    isHearSelfEnabled: false,

    messages: {
        FALLBACK: [
            '¿Que coño dices, imbécil?',
            'Que te pasa en la boca?',
            'Eres tonto o humano?',
            'A que te parto la cara',
            'No entiendo ni papa',
            'Aprende a hablar',
        ],
    },
});

genara.command('hola', async(bot, message) => message.channel.send('Hola, soy Genara'));

// eslint-disable-next-line max-len
genara.command('dame el link', async(bot, message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=389753947780546563&scope=bot&permissions=281664'));

genara.alias('cuantos insultos te sabes', 'cuantos insultos sabes');

module.exports = require('../common')(genara);
