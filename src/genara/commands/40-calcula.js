'use strict';
const redFlags = [ 'if', 'for', 'while', 'require' ];

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, script, { contains }) => {
    if (contains(script, redFlags)) {
        return message.reply('Intentas romper el tejido interdimensional? Pobre mortal...');
    }

    try {
        // eslint-disable-next-line no-new-func
        const response = new Function(`return ${script}`)();
        return message.reply(response);
    }
    catch (error) {
        return message.reply(`Ya la has liado: ${error.message}`);
    }
};
