'use strict';
const { random } = require('../util');
const genara = require('../genara');


genara.alias('help', 'ayuda');

genara.command('ayuda', async(message) => {
    const commands = genara.help.join('\n - ');
    const insult = random([
        'Si me invocas di algo útil...',
        'No me jodas, otra vez?',
        'Eres más pesado que Maram.',
        'Eres más corto que un gnomo.',
        'Estoy harta de repetirlo...',
        'Mascachapas.',
    ]);

    return message.reply(`${insult} Puedes decir:\n - ${commands}`);
});
