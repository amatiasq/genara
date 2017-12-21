'use strict';
const BOTS_COUNT = 3;
const CHANCE = (0.5 / BOTS_COUNT) + 0.5;
const triggers = [
    'omg',
    'wtf',
    'omfg',
    'wat',
];

module.exports = async(bot, message, { containsWord, random }) => {
    const trigger = triggers.some(trigger => containsWord(message.content, trigger));

    if (!trigger || message.omg) {
        return;
    }

    const execute = random(CHANCE);
    bot.log('MIDDLEWARE(OMG)', Boolean(execute));

    if (execute) {
        message.omg = true;
        message.sendImage(bot.randomImage('omg'));
    }
};
