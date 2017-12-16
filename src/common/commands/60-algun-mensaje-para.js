'use strict';

module.exports = async(bot, message, { contains, normalize, random }) => {
    const target = message.getFirstMention();

    if (!target) {
        return message.reply('Para quién?');
    }

    const messages = bot.memory.get(`${target}.tell`);

    if (!messages) {
        return message.reply('No, nada');
    }

    const authors = Object.keys(messages);

    if (authors.length === 1) {
        const [ author ] = authors;
        await message.reply(`hay un mensaje de ${author}: ${messages[author]}`);
        return;
    }

    const tell = authors
        .map(author => ` - de ${author}: ${messages[author]}`)
        .join('\n');

    await message.reply(`hay varios mensajes:\n${tell}`);
    return;
};
