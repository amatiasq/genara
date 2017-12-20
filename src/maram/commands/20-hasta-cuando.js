'use strict';
const chaos = require('../chaos-burst.json');

module.exports = async(bot, message, text, { randomItem, rollDice }) => {
    const response = rollDice(randomItem(chaos.until));
    const result = response[0].toLowerCase() + response.slice(1);
    return message.reply(`Until ${result}`);
};

