'use strict';

module.exports = async(genara, message, text, { splitWords }) => {
    const mention = message.mentions.users.first();
    const words = splitWords(text);

    if (words[0] === 'a') {
        return message.channel.send(`${mention || words.slice(1).join(' ')}, ${genara.insult()}`);
    }

    const index = parseInt(words[0], 10);
    if (!isNaN(index)) {
        return message.reply(genara.getLearnt('insult', index) || 'ese número no existe, idiota');
    }

    return message.reply(genara.insult([
        'Porqué te voy a hacer caso a ti?',
        'Mejor te arranco la yugular',
        'Como si no tuviera nada mejor que hacer',
        'Ya estamos...',
    ]));
};
