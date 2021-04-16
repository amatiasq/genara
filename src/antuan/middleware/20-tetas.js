'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { containsWord }) => {
    if (containsWord(message.content, 'tetas')) {
        message.sendImage(bot.randomImage('tetas'));
    }
};
