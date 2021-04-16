'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    const target = message.getFirstMention();

    if (!target) {
        return bot.executeCommand(message, 'cuantos puntos tengo');
    }

    const value = await bot.getPoints('pelea', target);
    return message.reply(`${target} tiene ${value} punto${value === 1 ? '' : 's'}.`);
};
