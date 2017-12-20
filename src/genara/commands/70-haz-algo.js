'use strict';

module.exports = async(bot, message, text, { randomItem, wait }) => {
    return randomItem([
        resucitar,
        fuego,
    ])(message, wait);
};


async function resucitar(message, wait) {
    await message.channel.send('Voy a RESUCITAR A LOS MUERTOS!');

    await message.channel.send({
        embed: {
            title: 'UL, UOY PA KIEUG OCOP OREP NIVIL RA',
            thumbnail: { url: 'http://repos.amatiasq.com/genara/img/invoca.png' },
        },
    });

    await message.channel.send('MUERTOS!! LEVANTAD VUESTRAS CABEZAS!!');
    await wait(3);
    await message.channel.send('hm...');
    await wait(2);
    return message.channel.send('Bueno, ya saldrán');
}


async function fuego(message) {
    await message.channel.send('ALLIRRAP AL A\n!!!ROJEM EBAS');
    await message.sendImage('http://repos.amatiasq.com/genara/img/wham.png');
    return message.reply('La próxima vas tu');
}
