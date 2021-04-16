'use strict';
export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    await bot.reset('pelea', message.author);
    return bot.executeCommand(message, 'puntos');
};
