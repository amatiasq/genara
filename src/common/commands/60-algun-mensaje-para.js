'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    const target = message.getFirstMention();

    if (!target) {
        return message.reply('Para quién?');
    }

    const { tell } = await bot.db.Users.get(target);

    if (!tell || !tell.length) {
        return message.reply('No, nada');
    }

    if (tell.length === 1) {
        const [{ author, text }] = tell;
        await message.reply(`hay un mensaje de ${author}: ${text}`);
        return;
    }

    const list = tell
        .map(({ author, text }) => ` - de ${author}: ${text}`)
        .join('\n');

    return message.reply(`hay varios mensajes:\n${list}`);
};
