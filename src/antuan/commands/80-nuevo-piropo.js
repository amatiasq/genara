'use strict';

module.exports = async(antuan, message, text) => {
    await antuan.learn('piropo', message.getAuthorNick(), text);
    return message.reply(text);
};
