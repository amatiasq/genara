'use strict';

const triggers = [
    'omg',
    'wtf',
    'omfg',
];

module.exports = async(bot, message, { containsWord, normalize, rand }) => {
    const trigger = triggers.some(trigger => containsWord(message.content, trigger));

    if (!trigger) {
        return;
    }

    const execute = rand(2);
    bot.log('MIDDLEWARE(OMG)', Boolean(execute));

    if (execute) {
        message.sendImage(bot.randomImage('omg'));
    }
};
