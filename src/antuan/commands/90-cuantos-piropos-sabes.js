'use strict';

module.exports = async(antuan, message, text, { randomItem }) => {
    return message.reply(`${await antuan.count('piropo')} ${randomItem([
        'pero a ti te seduzco con la mirada',
    ])}`);
};
