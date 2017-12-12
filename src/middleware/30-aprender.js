'use strict';
const { normalize, splitWords } = require('../util');
const genara = require('../genara');


genara.middleware(async(message, text, content) => {
    const words = splitWords(text);

    if (words[0] === 'soy') {
        genara.memory.set(`${message.author}.is`, words.slice(1).join(' '))
        return message.reply('Vale! Me lo apunto para el examen.');
    }

    if (words[1] === 'es' && words[0] !== 'quien') {
        genara.memory.set(`${normalize(words[0])}.is`, words.slice(2).join(' '));
        return message.reply('Vale! Me lo apunto para el examen.');
    }
});
