'use strict';

module.exports = async(bot, message, text, { random }) => {
    const insult = random([
        'Si me invocas di algo útil...',
        'No me jodas, otra vez?',
        'Eres más pesado que Maram.',
        'Eres más corto que un gnomo.',
        'Estoy harta de repetirlo...',
        'Mascachapas.',
    ]);

    return message.reply(`${insult} Puedes decir:\n${bot.help()}`);
};
