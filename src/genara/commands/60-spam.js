'use strict';

module.exports = async(genara, message) => {
    for (let i = 0; i < 10; i++) {
        message.author.send(genara.insult());
    }

    return true;
};
