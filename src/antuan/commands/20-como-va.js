'use strict';

module.exports = async(bot, message, text) => {
    const points = bot.memory.get('points') || {};
    const classification = Object.keys(points)
        .map(user => ({ user, points: points[user] }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 5)
        .map(({ user, points }, index) => `${index + 1} - ${user} con ${points} ${pluralize(points)}`)
        .join('\n\t');

    return message.reply(`Pues así estamos:\n\t${classification}`);
};


function pluralize(value) {
    return 'punto' + (value === 1 ? '' : 's');
}