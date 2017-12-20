'use strict';
const path = require('path');
const { randomItem, readdir } = require('./util');

module.exports = (BotSubclass) => {
    return class UtilsMixin extends BotSubclass {

        constructor(prefixes, options) {
            super(prefixes, options);

            this._messages = options.messages || {};
        }

        async hear(message) {
            const result = super.hear(message);

            if (!message.isMentioned() || result) {
                return result;
            }

            const fallback = message('FALLBACK');
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

        softMention(user) {
            const nicks = this.memory.get('nicknames') || {};
            return nicks[user] || user;
        }

        async setNickname(user, nick) {
            const nicknames = this.memory.get('nicknames') || {};

            if (nicknames[user] === nick) {
                return false;
            }

            nicknames[user] = nick;
            await this.memory.set('nicknames', nicknames);
            this.log('NICKNAMES', `${user} is "${nick}"`);
            return true;
        }

    };
};
