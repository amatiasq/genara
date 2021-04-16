'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    const value = await bot.getPoints('pelea', message.author);
    return message.reply(`Tienes ${value} punto${value === 1 ? '' : 's'}`);
};
