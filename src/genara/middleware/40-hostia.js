'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { containsWord }) => {
    if (containsWord(message.content, 'quien es hostia')) {
        return;
    }

    if (message.isMentioned() && containsWord(message.content, 'hostia')) {
        message.sendImage(bot.randomImage('hostia'));
    }
};
