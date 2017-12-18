'use strict';

module.exports = async(antuan, message, text, { randomItem, splitWords }) => {
    const mention = message.mentions.users.first();
    const words = splitWords(text);
    const piropos = antuan.memory.get('piropos') || [];

    if (words[0] === 'a') {
        return message.channel.send(`${mention || words.slice(1).join(' ')}, ${randomItem(piropos)}`);
    }

    const index = parseInt(words[0], 10);
    if (!isNaN(index)) {
        return message.reply(piropos[index] || 'ese número no existe, colega');
    }

    return message.reply(randomItem(piropos));
};
