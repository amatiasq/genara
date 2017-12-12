#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const genara = require('./genara');


genara.fallback('¿Que coño dices, imbécil?');
genara.fallback('Que te pasa en la boca?');
genara.fallback('Eres tonto o humano?');
genara.fallback('A que te parto la cara');
genara.fallback('No entiendo ni papa');
genara.fallback('Aprende a hablar');
genara.fallback('Te voy a sacar las muelas por el recto');

genara.command('hola', async(message) => message.channel.send('Hola, soy Genara'));
genara.command('di', async(message, text) => message.channel.send(text));
genara.command('dame el link', async(message) => message.channel.send('https://discordapp.com/oauth2/authorize?client_id=389753947780546563&scope=bot&permissions=281664'));

loadAll('./middleware');
loadAll('./commands');

genara.connect(process.env.GENARA_TOKEN);


function loadAll(route) {
    for (const file of fs.readdirSync(path.join(__dirname, route))) {
        require(`${route}/${file}`);
    }
}