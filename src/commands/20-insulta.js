'use strict';
const { splitWords } = require('../util');
const genara = require('../genara');

genara.command('insulta', async(message, text) => {
    const mention = message.mentions.users.first();
    const words =  splitWords(text);

    if (words[0] === 'a') {
        return message.channel.send(`${mention || words.slice(1).join(' ')}, ${genara.insult()}`);
    }

    return message.reply(genara.insult([
        'Porqué te voy a hacer caso a ti?',
        'Mejor te arranco la yugular',
        'Como si no tuviera nada mejor que hacer',
        'Ya estamos...',
    ]));
});
