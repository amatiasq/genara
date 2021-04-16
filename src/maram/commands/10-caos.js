'use strict';
const chaos = require('../chaos-burst.json');

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, text, { randomItem, rollDice }) => {
    return message.reply(rollDice(randomItem(chaos.chaos)));
};
