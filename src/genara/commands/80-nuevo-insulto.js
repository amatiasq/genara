'use strict';

module.exports = async(genara, message, text) => {
    const author = message.author.lastMessage.member.nickname || message.author.username;

    await genara.memory.edit('insults', (value = []) => [ ...value, `${text} (by ${author})` ]);

    return message.reply(text);
};
