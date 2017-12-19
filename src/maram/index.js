'use strict';
const { randomItem } = require('../util');
const Bot = require('../bot');


const maram = new Bot([
    'maram'
], {
    id: '391244013421854722',
    directory: './maram',
    isHearBotEnabled: true,
    isHearSelfEnabled: false,

    async unhandled(bot, message) {
        return message.reply(randomItem([
            'Lo tomaré como que deseas que me cuele en el lavabo de chicas',
        ]));
    }
});

maram.command('hola', async(bot, message) => message.channel.send('Hola, soy Maram'));
maram.command('dame el link', async(bot, message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=391244013421854722&scope=bot&permissions=281664'));

maram.alias('por cuanto tiempo', 'hasta cuando');

module.exports = require('../common')(maram);
