'use strict';

module.exports = async(bot, message, text, { normalize, randomItem, splitWords, trim }) => {
    const target = splitWords(trim(normalize(text)))[0];
    const user = await bot.db.Users.get(target);

    return message.channel.send(user.who || randomItem([
        'Quién?',
        'Ni puta idea',
        'Y yo que se',
        'A mi que me preguntas',
        'Tengo cara de ser tu asistente?',
    ]));
};
