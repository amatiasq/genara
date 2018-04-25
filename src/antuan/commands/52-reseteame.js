'use strict';
module.exports = async(bot, message) => {
    await bot.reset('pelea', message.author);
    return bot.executeCommand(message, 'puntos');
};
