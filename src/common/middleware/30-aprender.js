'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { normalize, splitWords }) => {
    if (!message.isMentioned()) {
        return;
    }

    let name;
    const words = splitWords(normalize(message.removeMention()));

    if (words[0] === 'soy') {
        name = String(message.author);
    }

    if (words[1] === 'es' && normalize(words[0]) !== 'quien') {
        name = words[0];
    }

    if (!name) {
        return;
    }

    const user = await bot.db.Users.get(name);
    user.who = words.slice(1).join(' ');
    await user.save();

    return message.reply('Vale! Me lo apunto para el examen.');
};
