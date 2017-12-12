'use strict';
const { contains } = require('../util');
const genara = require('../genara');


genara.middleware(async(message, text) => {
    if (contains(text, 'quien soy')) {
        return genara.executeCommand(message, `quien es ${message.author}`);
    }
});
