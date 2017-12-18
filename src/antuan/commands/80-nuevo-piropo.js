'use strict';

module.exports = async(antuan, message, text) => {
    const author = message.author.lastMessage.member.nickname || message.author.username;

    await antuan.memory.edit('piropos', (value = []) => [ ...value, `${text} (by ${author})` ]);

    return message.reply(text);
};
