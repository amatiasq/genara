'use strict';

module.exports = async(bot, message, text) => {
    return message.reply(`Puedes decir:\n${bot.help()}`);
};
