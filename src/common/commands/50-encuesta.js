'use strict';

module.exports = async(bot, message, text) => {
    const poll = await message.channel.send(text);
    await poll.react('✅');
    return poll.react('⛔');
};
