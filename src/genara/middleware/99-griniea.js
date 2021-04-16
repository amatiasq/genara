'use strict';

export default async function(bot: Applied<typeof Bot>, message: ExtendedMessage, { contains, normalize }) => {
    if (contains(normalize(message.content), 'griniea')) {
        return message.sendImage('http://repos.amatiasq.com/genara/img/griniea.png');
    }
};
