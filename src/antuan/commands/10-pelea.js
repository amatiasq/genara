'use strict';

module.exports = async(antuan, message, text, { containsWord, randomItem }) => {
    return antuan.fight(message, 'secret', containsWord(text, 'pro') ? 'master' : 'normal');
};
