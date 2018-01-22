const fs = require('fs');
const path = require('path');
const padLeft = require('left-pad');
const Discord = require('discord.js');
const Memory = require('./memory');
const util = require('./util');

module.exports = class Bot {

    static apply(...mixins) {
        return mixins.reduce((output, mixin) => mixin(output), Bot);
    }

    constructor(prefixes, {
        id,
        directory,
        isHearBotEnabled = false,
        isHearSelfEnabled = false,
        unhandled = () => {},
        messages = {},
    }) {
        this.prefixes = prefixes;
        this.name = prefixes[0];
        this.id = id;
        this.directory = directory;
        this._messages = messages;

        this._middleware = [];
        this._commands = [];
        this._alias = {};
        this._unhandled = unhandled;
        this._isHearBotEnabled = isHearBotEnabled;
        this._isHearSelfEnabled = isHearSelfEnabled;

        this.isConnected = false;
        this.client = new Discord.Client();
        this.memory = new Memory(path.join(__dirname, `../memory/${this.name}.json`), this.name);
    }

    log(type, ...message) {
        console.log(`[${padLeft(this.name.toUpperCase(), 6, ' ')}][${type}]`, ...message);
    }

    is(user) {
        return user.id === this.id;
    }

    _readdir(route) {
        return [].concat(
            util.readdir(path.join('common', route)),
            util.readdir(path.join(this.directory, route)),
        );
    }

    async connect(token) {
        if (this.isConnected) {
            return false;
        }

        for (const file of this._readdir('middleware')) {
            this.log('LOAD_MIDDLEWARE', file);
            this.middleware(require(file));
        }

        for (const file of this._readdir('commands')) {
            const command = file
                .replace(/^.*\//, '')
                .replace(/-/g, ' ')
                .replace(/^[0-9]+/, '')
                .replace(/\.js$/, '')
                .trim();

            this.log('LOAD_COMMAND', `${file} as "${command}"`);
            this.command(command, require(file));
        }

        this.client.on('message', message => this.onMessage(message));

        await this.client.login(token);
        await this.memory.load();

        this.isConnected = true;
        return true;
    }

    onMessage(message) {
        const isSelf = this.is(message.author);

        if (!this._isHearBotEnabled && message.author.bot && !isSelf) {
            return;
        }

        if (!this._isHearSelfEnabled && isSelf) {
            return;
        }

        message.content = message.content.replace(/<@!/g, '<@');
        const cleaned = this._cleanMessage(message);
        const self = this;

        Object.assign(message, {
            sendImage(url) {
                self.log('IMG', url);
                return this.channel.send({ embed: { image: { url }}});
            },

            isMentioned() {
                return Boolean(cleaned);
            },

            removeMention() {
                return cleaned || message.content;
            },

            getAuthorNick() {
                return this.author.lastMessage.member.nickname || this.author.username;
            },

            getFirstMention() {
                let index = 0;
                let target = message.mentions.users.first();

                while (target && target.id === self.id) {
                    index++;
                    target = message.mentions.users.first(index + 1)[index];
                }

                return target;
            },
        });

        this.log(
            `HEAR(${message.isMentioned()})`,
            `${util.datetime()} ${message.guild.name}#${message.channel.name} ${message.author.username}: ${message.content}`
        );

        return this.hear(message).catch(error => this.log('ERROR', error));
    }

    middleware(handler) {
        this._middleware.push(handler);
    }

    command(key, action) {
        this._commands[key] = action;
        this._cleanCommands();
    }

    alias(alias, command) {
        this._alias[alias] = command;
        this._cleanCommands();
    }

    help() {
        const aliases = Object.keys(this._alias);
        const commands = Object.keys(this._commands);

        const list = commands.map(command => {
            const alias = aliases.filter(alias => this._alias[alias] === command);

            return alias.length ?
                `${command} (${alias.join(', ')})` :
                command;
        });

        return ` - ${list.join('\n - ')}`;
    }

    _cleanCommands() {
        for (const command of Object.keys(this._commands)) {
            delete this._alias[command];
        }
    }

    async hear(message) {
        for (const entry of this._middleware) {
            if (await entry(this, message, util)) {
                this.log('MIDDLEWARE', this._middleware.indexOf(entry));
                return true;
            }
        }

        if (!message.isMentioned()) {
            return;
        }

        if (await this.executeCommand(message, message.removeMention())) {
            return true;
        }

        if (!message.author.bot && await this._unhandled(this, message, util)) {
            this.log('FALLBACK(HANDLER)');
            return true;
        }
    }

    async executeCommand(message, content) {
        const normalized = util.normalize(content);
        let text = content;
        let handler = null;

        for (const command of Object.keys(this._commands)) {
            if (normalized.startsWith(command)) {
                this.log(`COMMAND(${command})`, content);
                text = util.removeStart(content, command);
                handler = this._commands[command];
                break;
            }
        }

        if (!handler) {
            for (const alias of Object.keys(this._alias)) {
                if (normalized.startsWith(alias)) {
                    const command = this._alias[alias];
                    this.log(`ALIAS(${alias}=>${command})`, content);
                    text = util.removeStart(content, alias);
                    handler = this._commands[command];
                    break;
                }
            }
        }

        if (handler) {
            return handler(this, message, text, util);
        }
    }

    _cleanMessage(message) {
        const text = util.normalize(message.content);

        for (const prefix of this.prefixes) {
            if (util.trim(util.normalize(text)) === prefix) {
                return text;
            }

            if (util.containsWord(text, prefix)) {
                return util.remove(text, prefix);
            }
        }

        const botMention = message.mentions.users.find(user => this.is(user));

        if (botMention) {
            return util.remove(message.content, botMention);
        }
    }
};
