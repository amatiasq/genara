'use strict';
const number = /\d+/;

module.exports = async(antuan, message, { randomItem }) => {
    const match = message.removeMention().match(number);
    const response = match && parseInt(match[0], 10);

    if (response == null || isNaN(response)) {
        return;
    }

    const stored = antuan.memory.get('current-fights');

    if (!stored || !stored[message.author]) {
        return;
    }

    const entry = stored[message.author];
    const success = response === entry.answer;

    await antuan.endFight(message.author, entry.id);

    if (!success) {
        return message.reply(`No eres digno de mi espada. La respuesta correcta era la ${entry.answer}.`);
    }

    await antuan.memory.edit('points', (points = {}) => {
        const current = points[message.author] || 0;
        points[message.author] = current + 1;
        return points;
    });

    return message.reply(`${randomItem([
        'Touché!',
        'Bien jugado!',
    ])} Punto para ti!`);
};
