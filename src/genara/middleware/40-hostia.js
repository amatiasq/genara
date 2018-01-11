'use strict';

module.exports = async(bot, message, { containsWord }) => {
    if (containsWord(message.content, 'quien es hostia')) {
        return;
    }

    if (message.isMentioned() && containsWord(message.content, 'hostia')) {
        message.sendImage(bot.randomImage('hostia'));
    }
};
