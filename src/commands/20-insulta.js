'use strict';
const genara = require('../genara');

genara.command('insulta', async(message) => {
    return message.reply(
        genara.insult([
            'Porqué te voy a hacer caso a ti?',
            'Mejor te arranco la yugular',
            'Como si no tuviera nada mejor que hacer',
            'Ya estamos...',
        ])
    );
});
