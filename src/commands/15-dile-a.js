'use strict';
const { mention, normalize, remove, splitWords } = require('../util');
const genara = require('../genara')


genara.command('dile a', async(message, text) => {
    let target = message.mentions.users.first();

    if (target.id === genara.id) {
        target = message.mentions.users.first(2)[1];
    }

    const key = `${target}.tell`;
    const stored = genara.memory.get(key) || {};

    stored[String(message.author)] = remove(remove(text, target), mention(target));
    genara.memory.set(key, stored);

    return message.reply(`ok, si veo a ${target} se lo diré`);
});
