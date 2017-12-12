const { normalize, random, remove } = require('./util');
const Discord = require('discord.js');

module.exports = class Bot {

    constructor(prefixes, memoryFile) {
        this.prefixes = prefixes;
        this.prefix = prefixes[0];
        this._middleware = [];
        this._commands = {};
        this._fallbacks = [];
        this.help = [];
        this.isConnected = false;
        this.client = new Discord.Client();
    }

    connect(token) {
        if (this.isConnected) {
            return false;
        }

        this.client.on('message', message => {
            if (!message.author.bot) {
                return this.hear(message);
            }
        });

        this.client.login(token);
        this.isConnected = true;
        return true;
    }

    middleware(parser) {
        this._middleware.push(parser);
    }

    command(key, action) {
        this._commands[key] = action;
        this.help.push(key);
    }

    alias(key, command) {
        this._commands[key] = this._commands[command];
    }

    fallback(text) {
        this._fallbacks.push(text);
    }

    _cleanMessage(message) {
        const text = normalize(message.content);

        for (const prefix of this.prefixes) {
            if (text.startsWith(prefix)) {
                return remove(message.content, prefix);
            }
        }
    }

    async hear(message) {
        const text = this._cleanMessage(message);

        if (!text) {
            return;
        }

        for (const entry of this._middleware) {
            if (await entry(message, text)) {
                return;
            }
        }

        if (this.executeCommand(message, text)) {
            return;
        }

        return this.fallbackMessage(message);
    }

    executeCommand(message, content) {
        const text = normalize(content);

        for (const key of Object.keys(this._commands)) {
            if (text.startsWith(key)) {
                const handler = this._commands[key];
                const rest = remove(content, key);

                if (typeof handler === 'function') {
                    return handler(message, rest);
                }
            }
        }
    }

    fallbackMessage(message) {
        return message.reply(random(this._fallbacks));
    }
};
