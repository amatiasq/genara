'use strict';
const genara = require('../genara');


genara.command('spam', async(message) => {
    for (let i = 0; i < 10; i++) {
        message.author.send(genara.insult());
    }
});
