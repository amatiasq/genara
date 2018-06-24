'use strict';

Object.assign(exports, {

    priority: 10,

    default(bot, message) {
        // TODO: tr YOU_CAN_SAY
        return message.reply(`${bot.tr('YOU_CAN_SAY')}\n${bot.help()}`);
    },

});
