'use strict';

module.exports = async(bot, message, { containsWord }) => {
    if (message.isMentioned() && containsWord(message.content, 'puta')) {
        return message.reply('No me estarás llamando puta, no? pedazo de mierda');
    }
};
