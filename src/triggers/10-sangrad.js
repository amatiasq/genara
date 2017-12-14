'use strict';
const { contains, normalize, random } = require('../util');
const genara = require('../genara');


const mafrunes = [
    'http://blog.panreyes.com/sangrad.png',
    'http://repos.amatiasq.com/genara/sangrad.jpeg',
];


genara.trigger(async(message) => {
    if (contains(normalize(message.content), 'sangrad')) {
        message.channel.send({
            embed: {
                image: { url: random(mafrunes) }
            }
        });
    }
});
