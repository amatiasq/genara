'use strict';
const { contains } = require('../util');
const genara = require('../genara');


genara.middleware(async(message, text) => {
    if (contains(text, 'puta')) {
        return message.reply('No me estarás llamando puta, no? pedazo de mierda');
    }
});
