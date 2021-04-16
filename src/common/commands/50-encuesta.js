'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, text) => {
    const poll = await message.channel.send(text);
    await poll.react('✅');
    return poll.react('⛔');
};
