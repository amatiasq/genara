'use strict';

module.exports = async(genara, message, text, { randomItem }) => {
    return message.reply(`${genara.insults.length} ${randomItem([
        'y no son suficientes para describir tu cara',
        'pero aún no encuentro uno que te ponga en tu sitio',
        'pero me basta con uno para humillarte',
        'yo soy cola, tu pegamento',
        'aunque soy más de arrancar miembros',
        'pero son muy largos, te puedo partir esa cantidad de huesos mejor',
    ])}`);
};
