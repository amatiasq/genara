module.exports = async(genara, message, text) => {
    await genara.learn('insult', message.getAuthorNick(), text);
    return message.reply(text);
};
