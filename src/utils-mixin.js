'use strict';
const path = require('path');
const { randomItem, readdir } = require('./util');

module.exports = (BotSubclass) => {
    return class UtilsMixin extends BotSubclass {

        constructor(prefixes, options) {
            super(prefixes, options);

            this._messages = options.messages || {};
            this._nickCache = new Map();
        }

        async hear(message) {
            const result = await super.hear(message);

            if (result || message.author.bot || !message.isMentioned()) {
                return result;
            }

            const fallback = this.message('FALLBACK');
            this.log('FALLBACK(TEXT)', fallback);
            return message.reply(fallback);
        }

        message(label) {
            const value = this._messages[label];
            return Array.isArray(value) ? randomItem(value) : value;
        }

        randomImage(route) {
            const file = randomItem(readdir(path.join('../img', route)));
            return `http://repos.amatiasq.com/${path.join('genara', route, file)}`;
        }

        async softMention(user) {
            if (!this._nickCache.has(user.toString())) {
                const stored = await this.db.Users.get(user);

                if (stored && stored.nick) {
                    this._nickCache.set(user.toString(), stored.nick);
                }
            }

            return this._nickCache.get(user) || user;
        }

        async setNickname(user, nick) {
            const stored = this._nickCache.get(user.toString());

            if (stored === nick) {
                return false;
            }

            await this.db.Users.set(user, { nick });
            this._nickCache.set(user.toString(), nick);
            this.log('NICKNAMES', `${user} is "${nick}"`);
            return true;
        }

    };
};
