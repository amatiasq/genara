'use strict';
const chaos = require('../chaos-burst.json');

module.exports = async(bot, message, text, { randomItem, rollDice }) => {
    return message.reply(rollDice(randomItem(chaos.chaos)));
};

