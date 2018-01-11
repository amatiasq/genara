'use strict';

module.exports = async(bot, message) => {

    const classification = bot.getPoints('pelea')
        .slice(0, 5)
        .map(({ user, points }, index) => `${index + 1} - ${bot.softMention(user)} con ${points} ${pluralize(points)}`)
        .join('\n\t');

    return message.reply(`Pues así estamos:\n\t${classification}`);
};


function pluralize(value) {
    return 'punto' + (value === 1 ? '' : 's');
}
