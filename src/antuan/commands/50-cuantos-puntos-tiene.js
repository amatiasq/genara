'use strict';

module.exports = async(bot, message, text) => {
    const target = message.getFirstMention();
    const points = bot.memory.get('points') || {};
    const value = points[target];
    return message.reply(`${target} tiene ${value} punto${value === 1 ? '' : 's'}.`);
};
