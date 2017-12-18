'use strict';

module.exports = async(antuan, message, text, { randomItem }) => {
    return message.reply(`${antuan.memory.get('piropo', []).length} ${randomItem([
        'pero a ti te seduzco con la mirada',
    ])}`);
};
