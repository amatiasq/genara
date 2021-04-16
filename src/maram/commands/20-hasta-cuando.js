'use strict';
const chaos = require('../chaos-burst.json');

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, text, { randomItem, rollDice }) => {
    const response = rollDice(randomItem(chaos.until));
    const result = response[0].toLowerCase() + response.slice(1);
    return message.reply(`Until ${result}`);
};
