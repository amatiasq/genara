Object.assign(exports, {

    aliases: {
        help: [ 'ayuda' ],
    },

    default(bot) {
        const { db } = bot;
        const cache = new Map();

        return async() => {
            // TODO: get commands return list of names
            const commands = bot.getCommands();
            const aliases = await db.Memory
                .find({ plugin: null, type: 'alias' })
                .group('key');

            const list = commands.map(command => {
                // TODO: outdated implementation
                const alias = aliases.filter(alias => this._alias[alias] === command);

                return alias.length ?
                    `${command} (${alias.join(', ')})` :
                    command;
            });

            return ` - ${list.join('\n - ')}`;
        };
    },
});
