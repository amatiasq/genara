'use strict';
const Bot = require('../bot').apply(
    require('../utils-mixin'),
    require('../learn-mixin'),
    require('../trivia-mixin'),
    require('../ignore-mixin'),
);

const antuan = new Bot([
    'antuan',
], {
    id: '391243528799387652',
    directory: './antuan',
    isHearBotEnabled: true,
    isHearSelfEnabled: false,

    MIN_SECONDS: 4,
    MAX_SECONDS: 8,
    MIN_ANSWERS: 3,
    MAX_ANSWERS: 8,

    messages: {
        FALLBACK: [
            'No prefieres ver tetas?',
            'Mejor tetas!',
            'Tetas?',
        ],
        TRIVIA_TIMEOUT: [
            'Demasiado lento. Vuelve cuando estés a mi altura.',
            'Ya te habría ensartado 3 veces. Y la espada también.',
        ],
        TOO_MANY_POINTS: [
            'Que tal si descansas un poco?',
            'Ya tienes ventaja, que más quieres?',
            'Ahora no! vienen los ninjas papales!',
        ],
    },
});

antuan.command('hola', async(bot, message) => message.channel.send('Hola, soy Antuán'));

// eslint-disable-next-line max-len
antuan.command('dame el link', async(bot, message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=391243528799387652&scope=bot&permissions=281664'));

antuan.alias('peleemos', 'pelea');
antuan.alias('en garde', 'pelea');
antuan.alias('mira como tiemblo', 'pelea');
antuan.alias('no queda alcohol', 'pelea');
antuan.alias('echemos un pulso', 'pulso');
antuan.alias('suelta un piropo', 'piropo');
antuan.alias('cuantso puntos tiene', 'puntos');

module.exports = require('../common')(antuan);
