'use strict';
const number = /\d+/;

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { randomItem }) => {
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
