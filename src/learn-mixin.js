const { randomItem } = require('./util');

module.exports = (BotSubclass) => {
    return class LearnMixin extends BotSubclass {

        constructor(prefixes, options) {
            super(prefixes, options);

            this.USER_SCHEMA.who = String;

            this.newSchema('Learn', {
                type: String,
                text: String,
                nick: String,
            });
        }


        async learnWhoIs(target, value) {
            return this.db.Users.set(target, { nick });
        }

        async whoIs(target) {
            const user = await this.db.Users.get(target)
            return user.who || null;
        }

        async learn(type, nick, text) {
            return this.db.Learn.create({ type, text, nick });
        }

        async getLearnt(type, index = null) {
            const list = await this.db.Learn.find({ type });
            const result = index == null
                ? randomItem(list)
                : list[index];

            return `${result.text} (by ${result.nick})`;
        }

        async count(type) {
            const list = await this.db.Learn.find({ type });
            return list.length;
        }

    };
};
