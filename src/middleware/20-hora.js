'use strict';
const { contains, normalize, time } = require('../util');
const genara = require('../genara');
const triggers = [
    'dime la hora',
    'tienes hora?',
    'que hora es?',
    'que hora son?',
];


genara.middleware(async(message, text) => {
    if (!contains(normalize(text), triggers)) {
        return;
    }

    await message.channel.send('WAT TAUG ¿TI ZI');

    return message.channel.send({
        embed: {
            title: '**INSIGNIFIKANTE MORTAL!!!**',
            description: `Son las ${time()}\n=3`,
            author: { name: 'Demonio Infernal' },
            thumbnail: { url: 'http://repos.amatiasq.com/genara/demonio.png' }
        }
    });
});
