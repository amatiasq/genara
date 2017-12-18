'use strict';

module.exports = (bot) => {
    bot.command('di ', async(bot, message, text) => message.channel.send(text));

    bot.alias('help', 'ayuda');
    bot.alias('hay algun mensaje para', 'algun mensaje para');

    return bot;
};
