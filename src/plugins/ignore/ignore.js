'use strict';
// TODO: move to ENV_VARS
// const gods = [
//     '326474946996076556',
//     '370218583675895809',
// ];

Object.assign(exports, {

    priority: 0,

    async default(bot, message) {
        if (!bot.isAdmin(message.author)) {
            return;
        }

        // TODO: get target returns first non-self mention
        // check if .getFirstMention() already does this
        const target = message.getTarget();

        if (!target) {
            return;
        }

        return bot.ignore.toggle(target);
    },
});
