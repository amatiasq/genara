'use strict';

module.exports = async(bot, message) => {
    const messages = bot.memory.get(`${message.author}.tell`);

    if (!messages) {
        return;
    }

    const authors = Object.keys(messages);

    if (authors.length === 1) {
        const [ author ] = authors;
        await message.reply(`hay una carta para ti de ${author}: ${messages[author]}`);
        await bot.memory.remove(`${message.author}.tell`);
        return;
    }

    const tell = authors
        .map(author => ` - de ${author}: ${messages[author]}`)
        .join('\n');

    await message.reply(`hay varias cartas para ti:\n${tell}`);
    await bot.memory.remove(`${message.author}.tell`);
    return;

};
