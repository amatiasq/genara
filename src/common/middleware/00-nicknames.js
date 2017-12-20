'use strict';

module.exports = async(bot, message) => {
    const nick = message.author.lastMessage.member.nickname || message.author.username;
    bot.setNickname(message.author, nick);
};
