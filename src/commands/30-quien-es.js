'use strict';
const { normalize, random, splitWords } = require('../util');
const genara = require('../genara')


genara.command('quien es', async(message, text) => {
    const responses = {
        maram: 'un bicho',
        parabellum: 'Una zorra robaautores',
        matias: 'el puto amo (me apaga si no lo digo)',
        moran: 'quieres decir cerveza?',
        hostia: genara.insult(['Que te importa', 'Una colega, que pasa?']),
        angela: 'lee EMO, vago.',
        satanas: 'un buen tipo',
        yami: 'una patata sexy',
    };

    const target = normalize(splitWords(text)[0].replace(/\?/g, ''));
    const fromMemory = genara.memory.get(`${target}.is`);
    const defaultResponse = responses[target];

    return message.reply(
        fromMemory ||
        defaultResponse ||
        random([
            'Quién?',
            'Ni puta idea',
            'Y yo que se',
            'A mi que me preguntas',
            'Tengo cara de ser tu asistente?',
        ])
    );
});
