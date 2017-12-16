'use strict';
const { random } = require('../util');
const Bot = require('../bot');


const maram = new Bot([
    'maram'
], {
    id: '389753947780546563',
    directory: './maram',
    isHearBotEnabled: false,
    isHearSelfEnabled: false,

    async unhandled(bot, message) {
        return message.reply(random([
            'Lo tomaré como que deseas que me cuele en el lavabo de chicas',
        ]));
    }
});

maram.command('hola', async(bot, message) => message.channel.send('Hola, soy Maram'));
maram.command('dame el link', async(bot, message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=391244013421854722&scope=bot&permissions=281664'));
maram.command('di ', async(bot, message, text) => message.channel.send(text));

maram.alias('help', 'ayuda');

module.exports = maram;