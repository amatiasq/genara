'use strict';
const { random, wait } = require('../util');
const genara = require('../genara');


genara.command('haz algo', async(message) => {
    return random([
        resucitar,
        fuego,
    ])(message);
});


async function resucitar(message) {
    await message.channel.send('Voy a RESUCITAR A LOS MUERTOS!');

    await message.channel.send({
        embed: {
            title: 'UL, UOY PA KIEUG OCOP OREP NIVIL RA',
            thumbnail: { url: 'http://repos.amatiasq.com/genara/invoca.png' }
        }
    });

    await message.channel.send('MUERTOS!! LEVANTAD VUESTRAS CABEZAS!!');
    await wait(3);
    await message.channel.send('hm...');
    await wait(2);
    return message.channel.send('Bueno, ya saldrán');
}

async function fuego(message) {
    await message.channel.send('ALLIRRAP AL A\n!!!ROJEM EBAS');

    await message.channel.send({
        embed: {
            image: { url: 'http://repos.amatiasq.com/genara/wham.png' }
        }
    });

    return message.reply('La próxima vas tu');
}