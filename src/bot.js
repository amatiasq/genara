const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const Memory = require('./memory');
const util = require('./util');

module.exports = class Bot {

    constructor(prefixes, {
        id,
        directory,
        isHearBotEnabled = false,
        isHearSelfEnabled = false,
        unhandled = () => {},
    }) {
        this.prefixes = prefixes;
        this.name = prefixes[0];
        this.id = id;
        this.directory = directory;

        this._middleware = [];
        this._commands = [];
        this._alias = {};
        this._unhandled = unhandled;
        this._isHearBotEnabled = isHearBotEnabled;
        this._isHearSelfEnabled = isHearSelfEnabled;

        this.isConnected = false;
        this.client = new Discord.Client();
        this.memory = new Memory(path.join(__dirname, `../memory/${this.name}.json`));
    }

    log(type, ...message) {
        console.log(`[${this.name.toUpperCase()}][${type}]`, ...message);
    }

    is(user) {
        return user.id === this.id;
    }

    _readdir(route) {
        return [].concat(
            readdir(path.join('common', route)),
            readdir(path.join(this.directory, route)),
        );
    }

    randomImage(route) {
        const file = util.randomItem(readdir(path.join('../img', route)));
        return `http://repos.amatiasq.com/${path.join('genara', route, file)}`;
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

        message.content = message.content.replace(/\<\@\!/g, '<@');
        const cleaned = this._cleanMessage(message);
        const bot = this;

        Object.assign(message, {
            sendImage(url) {
                bot.log('IMG', url);
                return this.channel.send({ embed: { image: { url }}});
            },

            isMentioned() {
                return Boolean(cleaned);
            },

            removeMention() {
                return cleaned || message.content;
            },

            getFirstMention() {
                let index = 0;
                let target = message.mentions.users.first();

                while (target && target.id === bot.id) {
                    index++;
                    target = message.mentions.users.first(index + 1)[index];
                }

                return target;
            }
        });

        this.log(`HEAR(mentioned:${message.isMentioned()})`, message.content);
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

            return alias.length
                ? `${command} (${alias.join(', ')})`
                : command;
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
                return;
            }
        }

        if (!message.isMentioned()) {
            return;
        }

        if (await this.executeCommand(message, message.removeMention())) {
            return;
        }

        if (await this._unhandled(this, message, util)) {
            this.log('FALLBACK');
        }
    }

    async executeCommand(message, content) {
        const text = util.normalize(content);
        let handler = null;

        for (const command of Object.keys(this._commands)) {
            // this.log(`TEST_COMMAND(${command})`, content);
            if (text.startsWith(command)) {
                this.log(`COMMAND(${command})`, content);
                content = util.removeStart(content, command);
                handler = this._commands[command];
                break;
            }
        }

        if (!handler) {
            for (const alias of Object.keys(this._alias)) {
                if (text.startsWith(alias)) {
                    const command = this._alias[alias];
                    this.log(`ALIAS(${alias}=>${command})`, content);
                    content = util.removeStart(content, alias);
                    handler = this._commands[command];
                    break;
                }
            }
        }

        if (handler) {
            return await handler(this, message, content, util);
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

        const self = message.mentions.users.find(user => this.is(user));

        if (self) {
            return util.remove(message.content, self);
        }
    }
};


function readdir(route) {
    return fs.readdirSync(path.join(__dirname, route))
        .filter(file => file !== '.gitkeep' && file !== '.DS_Store')
        .map(file => './' + path.join(route, file))
        .sort();
}