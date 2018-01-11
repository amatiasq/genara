'use strict';

module.exports = async(bot, message, { normalize, splitWords }) => {
    if (!message.isMentioned()) {
        return;
    }

    let name;
    const words = splitWords(normalize(message.removeMention()));

    if (words[0] === 'soy') {
        name = String(message.author);
    }

    if (words[1] === 'es' && normalize(words[0]) !== 'quien') {
        name = words[0];
    }

    if (!name) {
        return;
    }

    const memory = bot.memory.get('who') || {};
    memory[name] = words.slice(1).join(' ');

    await bot.memory.set('who', memory);
    return message.reply('Vale! Me lo apunto para el examen.');
};
