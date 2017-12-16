'use strict';
const { random } = require('../util');
const Bot = require('../bot');


const antuan = new Bot([
    'antuan'
], {
    id: '389753947780546563',
    directory: './antuan',
    isHearBotEnabled: false,
    isHearSelfEnabled: false,

    async unhandled(bot, message) {
        return message.reply(random([
            'No prefieres ver tetas?',
        ]));
    }
});

antuan.command('hola', async(bot, message) => message.channel.send('Hola, soy Antuán'));
antuan.command('dame el link', async(bot, message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=391243528799387652&scope=bot&permissions=281664'));
antuan.command('di ', async(bot, message, text) => message.channel.send(text));

antuan.alias('help', 'ayuda');

module.exports = antuan;
