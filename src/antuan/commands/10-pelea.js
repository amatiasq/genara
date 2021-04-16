'use strict';
const insults = require('../insultos.json');

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, text, { containsWord }) => {
    const category = containsWord(text, 'idiota') ? 'third' : 'secret';
    const level = containsWord(text, 'pro') ? 'master' : 'normal';
    const list = insults[category].map(entry => {
        if (!entry[level]) {
            return null;
        }

        return {
            question: entry[level],
            answer: entry.answer,
        };
    });

    const result = await bot.trivia(message, 'pelea', list.filter(Boolean));

    if (!result) {
        return;
    }

    const { question, options, seconds } = result;
    return message.reply(`En garde!\n${question}\n\n${options.join('\n')}\n\nTienes ${seconds} segundos!`);
};
