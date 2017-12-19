'use strict';

module.exports = async(antuan, message, text, { randomItem }) => {
    const piropos = antuan.memory.get('piropos') || [];

    for (let i = 0; i < 10; i++) {
        message.author.send(randomItem(piropos));
    }

    return true;
};
