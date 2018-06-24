/**
 * - Adds `ignore` field to Users schema
 */

// export const db = {
//     Users: { ignore: Boolean }
// };

// export const aliases = {
//     ignore: [ 'ignora a' ],
// };

// export const events = {
//     hear(event, message) { ... }
// };

// export default function IgnorePlugin(bot) {
//     const cache = new Map();

//     return { ... };
// };

Object.assign(exports, {

    db: {
        Users: {
            ignore: Boolean,
        },
    },

    aliases: {
        ignore: [ 'ignora a' ],
    },

    events: {
        hear(event, message) {
            if (this.ignore.isIngoring(message.author)) {
                event.preventDefault();
            }
        },
    },

    default(bot) {
        const { db } = bot;
        const cache = new Map();

        return {
            async set(target, ignore) {
                return db.Users.set(target, { ignore });
            },

            async toggle(target) {
                const user = await db.Users.get(target);

                user.ignore = !user.ignore;
                cache.set(user.id, user.ignore);

                await user.save();
                return user.ignore;
            },

            async isIgnoring(user) {
                const target = user.toString();

                if (!cache.has(target)) {
                    const user = await db.Users.get(target);
                    cache.set(target, user.ignore);
                }

                return Boolean(cache.get(target));
            },
        };
    },
});

module.exports = (bot) => {
    const { db } = bot;
    const cache = new Map();

    db.addUserFields({
        ignore: Boolean,
    });

    bot.setAlias('ignore', [
        'ignora a',
    ]);

    bot.on('hear', (event) => {
        if (isIgnoring(event.message.author)) {
            event.preventDefault();
        }
    });

    // TODO: implicit?
    // bot.ignore = ;
    // bot.loadCommands(__dirname);

    return {
        set,
        toggle,
        isIgnoring,
    };


    async function set(target, ignore) {
        return db.Users.set(target, { ignore });
    }

    async function toggle(target) {
        const user = await db.Users.get(target);

        user.ignore = !user.ignore;
        cache.set(user.id, user.ignore);

        await user.save();
        return user.ignore;
    }

    async function isIgnoring(user) {
        const target = user.toString();

        if (!cache.has(target)) {
            const user = await db.Users.get(target);
            cache.set(target, user.ignore);
        }

        return Boolean(cache.get(target));
    }
};
