'use strict';
module.exports = async(bot, message) => {
    bot.reset('pelea', message.author);
    return bot.executeCommand(message, 'puntos');
};
