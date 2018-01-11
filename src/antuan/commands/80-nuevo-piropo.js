'use strict';

module.exports = async(antuan, message, text) => {
    antuan.learn('piropo', message.getAuthorNick(), text);
    return message.reply(text);
};
