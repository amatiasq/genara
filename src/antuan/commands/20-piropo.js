'use strict';

module.exports = async(antuan, message, text, { splitWords }) => {
    const mention = message.mentions.users.first();
    const words = splitWords(text);

    if (words[0] === 'a') {
        return message.channel.send(`${mention || words.slice(1).join(' ')}, ${antuan.getLearnt('piropo')}`);
    }

    const index = parseInt(words[0], 10);
    if (!isNaN(index)) {
        return message.reply(antuan.getLearnt('piropo', index) || 'ese número no existe, colega');
    }

    return message.reply(antuan.getLearnt('piropo'));
};
