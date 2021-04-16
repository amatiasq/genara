'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    const nick = message.author.lastMessage.member.nickname || message.author.username;
    bot.setNickname(message.author, nick);
};
