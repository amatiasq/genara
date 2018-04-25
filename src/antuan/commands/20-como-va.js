'use strict';

module.exports = async(bot, message) => {
    const board = await bot.getBoard('pelea');

    const classification = await Promise.all(board.map(async ({ user, points }, index) => {
        const nick = await bot.softMention(user);

        return `${index + 1} - ${nick} con ${points} ${pluralize(points)}`;
    }));

    return message.reply(`Pues así estamos:\n\t${classification.join('\n\t')}`);
};


function pluralize(value) {
    return 'punto' + (value === 1 ? '' : 's');
}
