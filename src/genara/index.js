'use strict';
const { randomItem } = require('../util');
const Bot = require('../bot');


class Genara extends Bot {

    get insults() {
        return this.memory.get('insults') || [];
    }

    insult(extra = []) {
        return randomItem(this.insults.concat(extra));
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

    async unhandled(bot, message) {
        return message.reply(randomItem([
            '¿Que coño dices, imbécil?',
            'Que te pasa en la boca?',
            'Eres tonto o humano?',
            'A que te parto la cara',
            'No entiendo ni papa',
            'Aprende a hablar',
        ]));
    }
});

genara.command('hola', async(bot, message) => message.channel.send('Hola, soy Genara'));
genara.command('dame el link', async(bot, message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=389753947780546563&scope=bot&permissions=281664'));

genara.alias('cuantos insultos te sabes', 'cuantos insultos sabes');

module.exports = require('../common')(genara);
