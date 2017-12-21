'use strict';
const SPAM_COUNT = 10;

module.exports = async(genara, message) => {
    for (let i = 0; i < SPAM_COUNT; i++) {
        message.author.send(genara.insult());
    }

    return true;
};
