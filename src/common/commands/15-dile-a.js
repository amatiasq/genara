'use strict';

module.exports = async(bot, message, text, { mention, removeStart }) => {
    const target = message.getFirstMention();

    if (!target) {
        return;
    }

    const key = `${target}.tell`;
    const stored = bot.memory.get(key) || {};

    stored[String(message.author)] = removeStart(removeStart(text, target), mention(target));
    bot.memory.set(key, stored);

    return message.reply(`ok, si veo a ${target} se lo diré`);
};
