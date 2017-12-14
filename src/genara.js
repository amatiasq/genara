'use strict';
const path = require('path');
const { random } = require('./util');
const Memory = require('./memory');
const Bot = require('./bot');

const prefixes = [
    'genara,',
    'genara',
    'gena,',
    'gena'
];

const insultos = [
    'Tu cara parece el cruce de un culo de babuino y la cara de buentiempo. No se cual de las dos es más horrible.',
    'Luchas como una vaca. Y hueles como una vaca, también.',
    'Tu inteligencia es comparable a la de un hamster retrasado en una rueda.',
    'Cuando te subes a un tren provocas que vaya con retraso.',
    'Antes me fusionaría de nuevo con Ángela.',
    'Hasta los esqueletos pueden oler tu fétido aliento.',
    'Me pregunto si tus huesos suenan cuando lo aplastas entre dimensiones...',
    'Quieres comer bordillo?',
    'Mascachapas.',
];

class Genara extends Bot {

    constructor(id, prefixes, memoryFile) {
        super(id, prefixes);
        this.memory = new Memory(memoryFile);
    }

    connect(token) {
        const operated = super.connect(token);

        if (operated) {
            this.memory.load();
        }

        return operated;
    }

    insult(extra = []) {
        return random(extra.concat(insultos));
    }
}

module.exports = new Genara('389753947780546563', prefixes, path.join(__dirname, '../memory.json'));