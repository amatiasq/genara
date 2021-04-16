'use strict';

const triggers = [
    'mola',
    'molas',
    'guapa',
    'badass',
    'quiero un hijo tuyo',
];

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { containsWord }) => {
    if (message.isMentioned() && triggers.some(trigger => containsWord(message.content, trigger))) {
        message.sendImage(bot.randomImage('genara-mola'));
    }
};
