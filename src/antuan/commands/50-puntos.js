'use strict';

module.exports = async(bot, message) => {
    const target = message.getFirstMention();

    if (!target) {
        return bot.executeCommand(message, 'cuantos puntos tengo');
    }

    const value = bot.getPoints('pelea', target);
    return message.reply(`${target} tiene ${value} punto${value === 1 ? '' : 's'}.`);
};
