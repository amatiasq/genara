'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    return message.reply(`Puedes decir:\n${bot.help()}`);
};
