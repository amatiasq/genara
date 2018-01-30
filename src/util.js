const fs = require('fs');
const path = require('path');
const padLeft = require('left-pad');
const removeDiacritics = require('diacritics').remove;
const NOT_ALPHANUMERIC_START = /^[^a-zA-Z0-9<>]+/;
const NOT_ALPHANUMERIC_END = /[^a-zA-Z0-9<>]+$/;
const DICE_ROLL = /(\d+)d(\d+)/;

Object.assign(exports, {
    array,
    contains,
    containsWord,
    date,
    datetime,
    time,
    mention,
    normalize,
    remove,
    removeStart,
    random,
    randomItem,
    readdir,
    rollDice,
    splitWords,
    trim,
    wait,
});

function array(length) {
    return new Array(length).fill(null);
}

function contains(string, value) {
    return Array.isArray(value) ?
        value.some(entry => contains(string, entry)) :
        string.indexOf(value) !== -1;
}

function containsWord(string, word) {
    return new RegExp(`\\b${word}\\b`).test(normalize(string));
}

function datetime(a = new Date()) {
    return `${date(a)} ${time(a)}`;
}

function date(date = new Date()) {
    const year = date.getFullYear();
    const month = padLeft(date.getMonth() + 1, 2, '0');
    const day = padLeft(date.getDate(), 2, '0');
    return `${year}/${month}/${day}`;
}

function time(date = new Date()) {
    const hours = date.getHours();
    const minutes = padLeft(date.getMinutes(), 2, '0');
    return `${hours}:${minutes}`;
}

function mention(user) {
    return String(user).replace(/^<@/, '<@!');
}

function normalize(text) {
    return removeDiacritics(text.toLowerCase());
}

function remove(string, text) {
    return trim(string.replace(text, ''));
}

function removeStart(string, start) {
    return trim(string.slice(start.length));
}

function random(max = 1, min = 0) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomItem(list) {
    return list[random(list.length - 1)];
}

function readdir(route) {
    return fs.readdirSync(path.join(__dirname, route))
        .filter(file => file !== '.gitkeep' && file !== '.DS_Store')
        .map(file => './' + path.join(route, file))
        .sort();
}


function rollDice(text) {
    let found = null;
    let result = text;
    const rolled = [];

    // eslint-disable-next-line no-cond-assign
    while (found = DICE_ROLL.exec(result)) {
        console.log('[ROLL]', result);
        const match = found[0];
        const dices = parseInt(found[1], 10);
        const faces = parseInt(found[2], 10);
        let verbose = null;
        let output = null;

        if (dices === 1) {
            output = verbose = random(1, faces);
        }
        else {
            const rolls = array(dices).map(() => random(1, faces));
            output = rolls.reduce((sum, roll) => sum + roll, 0);
            verbose = `(${rolls.join(' + ')}) = ${output}`;
        }

        rolled.push(`Roll ${match}: ${verbose}`);
        result = result.replace(match, `{${output}}`);
    }

    return rolled.length ? `${result}\n  - ${rolled.join('\n  - ')}` : result;
}

function splitWords(text) {
    return text.split(/\s+/g);
}

function trim(text) {
    const normalized = normalize(text);
    const start = normalized.match(NOT_ALPHANUMERIC_START);
    const end = normalized.match(NOT_ALPHANUMERIC_END);
    let result = text;

    if (start) {
        result = result.slice(start[0].length);
    }

    if (end) {
        result = result.slice(0, -end[0].length);
    }

    return result;
}

function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
