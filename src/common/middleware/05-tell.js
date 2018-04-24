'use strict';

module.exports = async(bot, message) => {
    const user = await bot.db.Users.get(message.author);
    const { tell } = user;

    if (!tell || !tell.length) {
        return;
    }

    if (tell.length === 1) {
        const [{ author, text }] = tell;
        await message.reply(`hay una carta para ti de ${author}: ${text}`);
    } else {
        const response = tell
            .map(({ author, text }) => ` - de ${author}: ${text}`)
            .join('\n');

        await message.reply(`hay varias cartas para ti:\n${response}`);
    }

    user.tell = null;
    return user.save();
};
