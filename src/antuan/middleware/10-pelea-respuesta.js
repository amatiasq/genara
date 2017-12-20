'use strict';
const number = /\d+/;

module.exports = async(bot, message, { randomItem }) => {
    const result = await bot.resolveTrivia('pelea', message.author, message.removeMention());

    if (!result) {
        return;
    }

    const { success, expected } = result;

    if (!success) {
        return message.reply(`No eres digno de mi espada. La respuesta correcta era la ${expected}.`);
    }

    await bot.addPoints('pelea', message.author, 1);

    return message.reply(`${randomItem([
        'Touché!',
        'Bien jugado!',
    ])} Punto para ti!`);
};
