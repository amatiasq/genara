'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage) => {
    const result = await bot.lowerPoints('pelea', 0.1);

    if (!result) {
        return message.reply('Es verdad! casi se me olvida!');
    }

    return message.reply(`Aún no, faltan ${result} horas...`);
};
