'use strict';
const insults = require('../insultos.json').pulso;

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    const result = await bot.trivia(message, 'pelea', insults);

    if (!result) {
        return;
    }

    const { question, options, seconds } = result;
    return message.reply(`En garde!\n${question}\n\n${options.join('\n')}\n\nTienes ${seconds} segundos!`);
};
