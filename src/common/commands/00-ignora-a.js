'use strict';
const gods = [
    '326474946996076556',
    '370218583675895809',
];

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, text, { mention, removeStart }) => {
    if (gods.indexOf(String(message.author.id)) === -1) {
        return;
    }

    const target = message.getFirstMention();

    if (!target) {
        return;
    }

    return bot.ignore(target, message);
};
