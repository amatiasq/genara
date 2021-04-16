'use strict';

const triggers = [
    'dime la hora',
    'tienes hora',
    'tiene hora',
    'que hora es',
    'que hora son',
];

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { containsWord, time }) => {
    if (!triggers.some(trigger => containsWord(message.content, trigger))) {
        return;
    }

    await message.channel.send('WAT TAUG ¿TI ZI');

    return message.channel.send({
        embed: {
            title: '**INSIGNIFIKANTE MORTAL!!!**',
            description: `Son las ${time()}\n=3`,
            author: { name: 'Demonio Infernal' },
            thumbnail: { url: 'http://repos.amatiasq.com/genara/img/demonio.png' },
        },
    });

};
