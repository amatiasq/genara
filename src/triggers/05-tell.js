'use strict';
const { contains, normalize, random } = require('../util');
const genara = require('../genara');


genara.trigger(async(message) => {
    const messages = genara.memory.get(`${message.author}.tell`);

    if (!messages) {
        return;
    }

    const authors = Object.keys(messages);

    if (authors.length === 1) {
        const [ author ] = authors;
        await message.reply(`hay una carta para ti de ${author}: ${messages[author]}`);
        await genara.memory.remove(`${message.author}.tell`);
        return;
    }

    const tell = authors
        .map(author => ` - de ${author}: ${messages[author]}`)
        .join('\n');

    await message.reply(`hay varias cartas para ti:\n${tell}`);
    await genara.memory.remove(`${message.author}.tell`);
    return;
});
