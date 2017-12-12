'use strict';
const genara = require('../genara');


genara.command('encuesta', async(message, text) => {
    const poll = await message.channel.send(text);
    await poll.react(`✅`);
    return poll.react(`⛔`);
});
