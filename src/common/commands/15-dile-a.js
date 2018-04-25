'use strict';

module.exports = async(bot, message, text, { mention, removeStart }) => {
    const target = message.getFirstMention();

    if (!target) {
        return;
    }

    const user = await bot.db.Users.get(target);
    const entry = {
        author: message.author.toString(),
        text: removeStart(removeStart(text, target), mention(target)),
    };

    if (!user.tell) {
        user.tell = [entry];
    } else {
        user.tell.push(entry);
    }

    await user.save();

    return message.reply(`ok, si veo a ${target} se lo diré`);
};
