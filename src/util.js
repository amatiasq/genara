const padLeft = require('left-pad');
const removeDiacritics = require('diacritics').remove;

Object.assign(exports, {
    contains,
    time,
    normalize,
    remove,
    random,
    splitWords,
});

function contains(string, value) {
    return Array.isArray(value)
        ? value.some(entry => contains(string, entry))
        : string.indexOf(value) !== -1;
}

function time(date = new Date()) {
    const hours = date.getHours();
    const minutes = padLeft(date.getMinutes(), 2, '0');
    return `${hours}:${minutes}`;
}

function normalize(text) {
    return removeDiacritics(text.toLowerCase());
}

function remove(string, start) {
    return string.slice(start.length).trim();
}

function random(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function splitWords(text) {
    return text.split(/\s+/g);
}
