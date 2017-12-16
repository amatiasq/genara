'use strict';

module.exports = async(bot, message, { containsWord }) => {
    if (containsWord(message.content, 'quien soy')) {
        return bot.executeCommand(message, `quien es ${message.author}`);
    }
};
