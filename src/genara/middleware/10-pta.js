'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { containsWord }) => {
    if (message.isMentioned() && containsWord(message.content, 'puta')) {
        return message.reply('No me estarás llamando puta, no? pedazo de mierda');
    }
};
