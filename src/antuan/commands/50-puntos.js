'use strict';

module.exports = async(bot, message, text) => {
    const target = message.getFirstMention();

    if (!target) {
        return await bot.executeCommand(message, 'cuantos puntos tengo');
    }

    const points = bot.memory.get('points') || {};
    const value = points[target] || 0;
    return message.reply(`${target} tiene ${value} punto${value === 1 ? '' : 's'}.`);
};
