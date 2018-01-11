'use strict';

module.exports = async(bot, message) => {
    const value = bot.getPoints('pelea', message.author);
    return message.reply(`Tienes ${value} punto${value === 1 ? '' : 's'}`);
};
