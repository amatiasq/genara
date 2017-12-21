module.exports = async(genara, message, text) => {
    genara.learn('insult', message.getAuthorNick(), text);
    return message.reply(text);
};
