const { randomItem } = require('./util');

module.exports = (BotSubclass) => {
    return class IgnoreMixin extends BotSubclass {

        constructor(prefixes, options) {
            super(prefixes, options);

            this._ignoreCache = new Map();
            this.USER_SCHEMA.ignore = Boolean;
        }

        async ignore(target, message) {
            const user = await this.db.Users.get(target);
            const wasIgnoring = user.ignore;

            user.ignore = !user.ignore
            this._ignoreCache.set(user.id, user.ignore);

            await user.save();

            if (message) {
                return message.reply(wasIgnoring ? 'vale, le haré caso' : 'eso está hecho');
            }
        }

        async hear(message) {
            if (await this.isIgnoring(message.author)) {
                return false;
            }

            return super.hear(message);
        }

        async isIgnoring(target) {
            target = target.toString();

            if (!this._ignoreCache.has(target)) {
                const user = await this.db.Users.get(target);
                this._ignoreCache.set(target, user.ignore);
            }

            return Boolean(this._ignoreCache.get(target));
        }

    };
};
