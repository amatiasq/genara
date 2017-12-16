'use strict';
const redFlags = ['if',  'for', 'while', 'require'];

module.exports = async(bot, message, script, { contains }) => {
    if (contains(script, redFlags)) {
        return message.reply('Intentas romper el tejido interdimensional? Pobre mortal...');
    }

    try {
        const response = new Function(`return ${script}`)();
        return message.reply(response);
    } catch (error) {
        return message.reply(`Ya la has liado: ${error.message}`);
    }
};
