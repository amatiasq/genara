'use strict';

module.exports = async(bot, message, { containsWord, normalize, trim }) => {
    const isMentioned = message.isMentioned();
    const text = trim(normalize(message.content));
    const isQuienSoy = text === 'quien soy' || text === 'quien soy?';
    const isInvoked = containsWord(text, 'quien soy');

    if (isQuienSoy || (isMentioned && isInvoked)) {
        return bot.executeCommand(message, `quien es ${message.author}`);
    }
};
