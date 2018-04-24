'use strict';

module.exports = async(bot, message) => {
    const value = await bot.getPoints('pelea', message.author);
    return message.reply(`Tienes ${value} punto${value === 1 ? '' : 's'}`);
};
