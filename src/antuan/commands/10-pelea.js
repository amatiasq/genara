'use strict';

module.exports = async(antuan, message, text, { containsWord, randomItem }) => {
    return antuan.fight(
        message,
        containsWord(text, 'idiota') ? 'third' : 'secret',
        containsWord(text, 'pro') ? 'master' : 'normal'
    );
};
