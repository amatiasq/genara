const padLeft = require('left-pad');
const removeDiacritics = require('diacritics').remove;
const NOT_ALPHANUMERIC_START = /^[^a-zA-Z0-9<>]+/;
const NOT_ALPHANUMERIC_END = /[^a-zA-Z0-9<>]+$/;
const DICE_ROLL = /(\d+)d(\d+)/;

Object.assign(exports, {
    array,
    contains,
    containsWord,
    time,
    mention,
    normalize,
    remove,
    removeStart,
    random,
    randomItem,
    rollDice,
    splitWords,
    trim,
    wait,
});

function array(length) {
    return new Array(length).fill(null);
}

function contains(string, value) {
    return Array.isArray(value)
        ? value.some(entry => contains(string, entry))
        : string.indexOf(value) !== -1;
}

function containsWord(string, word) {
    return new RegExp(`\\b${word}\\b`).test(normalize(string));
}

function time(date = new Date()) {
    const hours = date.getHours();
    const minutes = padLeft(date.getMinutes(), 2, '0');
    return `${hours}:${minutes}`;
}

function mention(user) {
    return String(user).replace(/^\<\@/, '<@!');
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
    return Math.round((Math.random() * (max - min)) + min);
}

function randomItem(list) {
    return list[random(list.length - 1)];
}

function rollDice(text) {
    let found;

    while (found = DICE_ROLL.exec(text)) {
        const match = found[0];
        const dices = parseInt(found[1], 10);
        const faces = parseInt(found[2], 10);

        if (dices === 1) {
            text = text.replace(match, random(faces));
        } else {
            const rolls = array(dices).map(() => random(faces));
            const total = rolls.reduce((sum, roll) => sum + roll, 0);
            text = text.replace(match, `(${rolls.join(' + ')}) = ${total}`);
        }
    }

    return text;
}

function splitWords(text) {
    return text.split(/\s+/g);
}

function trim(text) {
    const normalized = normalize(text);
    const start = normalized.match(NOT_ALPHANUMERIC_START);
    const end = normalized.match(NOT_ALPHANUMERIC_END);

    if (start) {
        text = text.slice(start[0].length);
    }

    if (end) {
        text = text.slice(0, -end[0].length);
    }

    return text;
}

function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
