'use strict';

module.exports = async(bot, message, text, { normalize, random, splitWords, trim}) => {
    const target = splitWords(trim(normalize(text)))[0];
    const memory = bot.memory.get('who') || {};

    return message.channel.send(memory[target] || random([
        'Quién?',
        'Ni puta idea',
        'Y yo que se',
        'A mi que me preguntas',
        'Tengo cara de ser tu asistente?',
    ]));
};
