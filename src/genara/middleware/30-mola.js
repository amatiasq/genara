'use strict';

const triggers = [
    'mola',
    'molas',
    'guapa',
    'badass',
    'quiero un hijo tuyo',
];

module.exports = async(bot, message, { containsWord }) => {
    if (message.isMentioned() && triggers.some(trigger => containsWord(message.content, trigger))) {
        message.sendImage(bot.randomImage('genara-mola'));
    }
};
