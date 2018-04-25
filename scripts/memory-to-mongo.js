#!/usr/bin/env node
/* eslint no-process-env:0 */
'use strict';
const LEARN = /^learnt-(\w+)$/
const POINTS = /^points-(\w+)$/
const LOWER = /^points-(\w+)-lower/

start();

const migrators = {
    async who(bot, key, value) {
        // console.log(`[${bot.name}][WHO] ${key} ${value}`);
        return bot.db.Users.set(key, { who: value });
    },
    async nicknames(bot, key, value) {
        // console.log(`[${bot.name}][NICK] ${key} ${value}`);
        return bot.db.Users.set(key, { nick: value });
    },
    async 'running-trivia'() {
        // noop
    }
};

const custom = {
    async learn(bot, type, key, value) {
        const match = value.match(/(.*) \(by (.*)\)/)
        const entry = {
            type,
            text: match[1],
            nick: match[2],
        };

        // console.log(`[${bot.name}][LEARN] ${match[1]} by ${match[2]}`);
        await bot.db.Learn.deleteMany(entry);
        return bot.db.Learn.create(entry);
    },
    async points(bot, type, user, points) {
        // console.log(`[${bot.name}][POINTS] ${user}: ${points}`);
        await bot.db.Points.deleteMany({ type, user });
        return bot.db.Points.create({ type, user, points })
    },
    async lower(bot, type, key, value) {
        // noop
    }
}

function partialHandler(bot, type, key, value) {
    const learn = type.match(LEARN);

    if (learn) {
        return custom.learn(bot, learn[1], key, value);
    }

    const points = type.match(POINTS);

    if (points) {
        return custom.points(bot, points[1], key, value);
    }

    const lower = type.match(LOWER);

    if (lower) {
        return custom.lower(bot, points[1], key, value);
    }
}

async function start() {
    const db = await require('../src/mongodb');

    await Promise.all([
        migrate('genara', process.env.GENARA_TOKEN, db),
        migrate('antuan', process.env.ANTUAN_TOKEN, db),
        migrate('maram', process.env.MARAM_TOKEN, db),
    ]);

    console.log('\n\nMIGRATION COMPLETED.');
}

async function migrate(name, token, db) {
    const bot = require(`../src/${name}`);
    const memory = require(`../memory/${name}.json`);

    await bot.connect(token, db);

    return Promise.all(Object.keys(memory).map(async (category) => {
        const entry = memory[category];
        const handler = migrators[category];
        const keys = Object.keys(entry);

        return Promise.all(keys.map(key => handler
                ? handler(bot, key, entry[key])
                : partialHandler(bot, category, key, entry[key])
        ));
    }));
}
