const { EventEmitter } = require('events');
const fs = require('fs');
const path = require('path');
const padLeft = require('left-pad');
const Discord = require('discord.js');
const util = require('./util');
const deepMerge = require('lodash.merge');
const logged = new Map();

// every hour
setInterval(() => logged.clear(), 1000 * 60 * 60);

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

        this._tr = {};
        this._middleware = [];
        this._commands = [];
        this._aliases = {};
        this._unhandled = unhandled;
        this._isHearBotEnabled = isHearBotEnabled;
        this._isHearSelfEnabled = isHearSelfEnabled;

        this.isConnected = false;
        this._emitter = new EventEmitter();
        this.client = new Discord.Client();

        this._schemas = {
            Users: { id: String },
            Memory: {
                type: String,
                key: String,
                value: String,
            },
        };
    }

    async connect(token, db) {
        if (this.isConnected) {
            return false;
        }

        await Promise.all([
            this._connectDatabase(db),
            this._connectDiscord(token),
        ]);

        this.isConnected = true;
        return true;
    }

    _connectDatabase(db) {
        const { Users, Memory, ...schemas } = this._schemas;
        const UserSchema = new db.Schema(Users);
        const MemorySchema = new db.Schema(Memory);

        // This is mongoose API
        /* eslint-disable no-invalid-this */

        UserSchema.static('get', async function(id) {
            const result = await this.findOne({ id });
            return result || this.create({ id });
        });

        UserSchema.static('set', async function(id, values) {
            return this.findOneAndUpdate(
                { id },
                { $set: values },
                { upsert: true },
            );
        });

        MemorySchema.static('get', async function(type, key) {
            return this.findOne({ type, key });
        });

        MemorySchema.static('set', async function(type, key, value) {
            return this.findOneAndUpdate(
                { type, key },
                { $set: { value }},
                { upsert: true },
            );
        });

        MemorySchema.static('delete', async function(type, key = null) {
            return this.deleteMany(key ? { type, key } : { type });
        });

        /* eslint-enable no-invalid-this */

        const models = {
            Users: db.model(`${this.name}_Users`, UserSchema),
            Memory: db.model(`${this.name}_Memory`, MemorySchema),
        };

        Object.keys(this._schemas).forEach(key => {
            models[key] = db.model(
                `${this.name}_${key}`,
                new db.Schema(this._schemas[key])
            );
        });

        this.db = models;
    }

    async _connectDiscord(token) {
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
    }

    is(user) {
        return user.id === this.id;
    }

    log(type, ...message) {
        console.log(`[${padLeft(this.name.toUpperCase(), 6, ' ')}][${type}]`, ...message);
    }

    loadLanguage(route) {
        this._tr = require(route);
    }

    loadPlugin(route) {
        const name = path.basename(route);
        const plugin = require(route);

        if (plugin.db) {
            keys(plugin.db, this._setSchema.bind(this));
        }

        if (plugin.commands) {
            keys(plugin.commands, this._addCommand.bind(this));
        }

        if (plugin.aliases) {
            keys(plugin.aliases, this._addAliases.bind(this));
        }

        if (plugin.events) {
            keys(plugin.events, this._registerEvent.bind(this));
        }

        this[name] = plugin.default(this);
    }

    _setSchema(name, schema) {
        this._schemas[name] = Object.assign({}, this._schemas[name], schema);
    }

    _addCommand(name, command) {
        const entry = Object.assign({}, command, { name });
        this._commands.push(entry);
    }

    _addAliases(command, aliases) {
        aliases.forEach(alias => this._aliases[alias] = command);
    }

    _registerEvent(event, handler) {
        this._emitter.on(event, handler);
    }

}

function keys(object, iterator) {
    Object.keys(object).forEach(key => iterator(key, object[key], object));
}






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

        this._schemas = {};
        this.USER_SCHEMA = {
            id: String,
            nick: String,
            who: String,
            tell: [{
                author: String,
                text: String,
            }],
        };
        this.MEMORY_SCHEMA = {
            key: String,
            value: String,
        };
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

    newSchema(key, schema) {
        this._schemas[key] = schema;
    }

    async connect(token, db) {
        if (this.isConnected) {
            return false;
        }

        await Promise.all([
            this._connectDatabase(db),
            this._connectDiscord(token),
        ]);

        this.isConnected = true;
        return true;
    }

    _connectDatabase(db) {
        const UserSchema = new db.Schema(this.USER_SCHEMA);
        const MemorySchema = new db.Schema(this.MEMORY_SCHEMA);

        UserSchema.static('get', async function(id) {
            const result = await this.findOne({ id });
            return result || this.create({ id });
        });

        UserSchema.static('set', async function(id, values) {
            return this.findOneAndUpdate(
                { id },
                { $set: values },
                { upsert: true }
            );
        });

        MemorySchema.static('get', async function(key) {
            return this.findOne({ key });
        });

        MemorySchema.static('set', async function(key, value) {
            return this.findOneAndUpdate({ key }, { $set: { value }});
        });

        MemorySchema.static('delete', async function(key) {
            return this.deleteOne({ key });
        });

        const models = {
            Users: db.model(`${this.name}_Users`, UserSchema),
            Memory: db.model(`${this.name}_Memory`, MemorySchema),
        };

        Object.keys(this._schemas).forEach(key => {
            models[key] = db.model(
                `${this.name}_${key}`,
                new db.Schema(this._schemas[key])
            );
        });

        this.db = models;
    }

    async _connectDiscord(token) {
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

        const logEntry = `[${util.datetime()}, ${message.guild.name}#${message.channel.name}] ${message.author.username}: ${message.content}`;

        if (!logged.has(logEntry)) {
            logged.set(logEntry, true);
            console.log(logEntry);
        }

        if (message.isMentioned()) {
            this.log('HEAR');
        }

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
