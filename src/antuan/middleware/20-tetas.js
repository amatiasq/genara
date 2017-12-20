'use strict';

module.exports = async(bot, message, { containsWord }) => {
    if (containsWord(message.content, 'tetas')) {
        message.sendImage(bot.randomImage('tetas'));
    }
};
