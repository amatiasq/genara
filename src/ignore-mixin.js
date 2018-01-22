const { randomItem } = require('./util');

module.exports = (BotSubclass) => {
    return class IgnoreMixin extends BotSubclass {

        ignore(target, message) {
            let wasIgnoring = false;

            this.memory.edit(`${target}.ignore`, value => {
                wasIgnoring = value;
                return !value;
            });

            if (message) {
                return message.reply(wasIgnoring ? 'vale, le haré caso' : 'eso está hecho');
            }
        }

        hear(message) {
            if (this.memory.get(`${message.author}.ignore`)) {
                return Promise.resolve(false);
            }

            return super.hear(message);
        }

    };
};
