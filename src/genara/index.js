'use strict';
const { random } = require('../util');
const Bot = require('../bot');


class Genara extends Bot {

    get insults() {
        return this.memory.get('insults') || [];
    }

    insult(extra = []) {
        return random(this.insults.concat(extra));
    }
}


const genara = new Genara([
    'genara',
    'gena',
], {
    id: '389753947780546563',
    directory: './genara',
    isHearBotEnabled: false,
    isHearSelfEnabled: false,

    async unhandled(bot, message) {
        return message.reply(random([
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
genara.command('di ', async(bot, message, text) => message.channel.send(text));

genara.alias('help', 'ayuda');
genara.alias('cuantos insultos te sabes', 'cuantos insultos sabes');
genara.alias('hay algun mensaje para', 'algun mensaje para');

module.exports = genara;
