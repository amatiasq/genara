'use strict';

module.exports = async(bot, message, { containsWord }) => {
    if (containsWord(message.content, 'sangrad')) {
        message.sendImage(bot.randomImage('mafrune'));
    }
};
