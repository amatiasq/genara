'use strict';

module.exports = async(bot, message, text) => {
    const points = bot.memory.get('points') || {};
    const value = points[message.author] || 0;
    return message.reply(`Tienes ${value} punto${value === 1 ? '' : 's'}`);
};
