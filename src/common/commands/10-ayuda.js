'use strict';

module.exports = async(bot, message) => {
    return message.reply(`Puedes decir:\n${bot.help()}`);
};
