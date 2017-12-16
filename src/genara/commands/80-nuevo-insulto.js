'use strict';

module.exports = async(genara, message, text) => {
    const author = message.author.lastMessage.member.nickname || message.author.username;
    const stored = genara.memory.get('insults') || [];

    stored.push(`${text} (by ${author})`);
    genara.memory.set('insults', stored);

    return message.reply(text);
};
