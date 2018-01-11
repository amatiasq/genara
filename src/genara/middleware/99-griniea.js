'use strict';

module.exports = async(bot, message, { contains, normalize }) => {
    if (contains(normalize(message.content), 'griniea')) {
        return message.sendImage('http://repos.amatiasq.com/genara/img/griniea.png');
    }
};
