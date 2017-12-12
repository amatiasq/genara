'use strict';
const { contains } = require('../util');
const genara = require('../genara')
const redFlags = ['if',  'for', 'while', 'require'];


genara.command('calcula', async(message, script) => {
    if (contains(script, redFlags)) {
        return message.reply('Intentas romper el tejido interdimensional? Pobre mortal...');
    }

    try {
        const response = new Function(`return ${script}`)();
        return message.reply(response);
    } catch (error) {
        return message.reply(`Ya la has liado: ${error.message}`);
    }
});
