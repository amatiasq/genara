'use strict';
const MESSAGES_COUNT = 10;

module.exports = async(antuan, message) => {
    for (let i = 0; i < MESSAGES_COUNT; i++) {
        message.author.send(antuan.getLearnt('piropos'));
    }

    return true;
};
