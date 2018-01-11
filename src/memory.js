const { promisify } = require('util');
const stat = promisify(require('fs').stat);
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

module.exports = class Memory {

    constructor(filename, name) {
        this.name = name;
        this.filename = filename;
        this.data = {};
    }

    async save() {
        return writeFile(this.filename, JSON.stringify(this.data, null, '  '));
    }

    async load() {
        try {
            this.data = JSON.parse(await readFile(this.filename));
        }
        catch (error) {
            this.data = {};
        }
    }

    async set(key, value) {
        this.data[key] = value;
        return this.save();
    }

    async remove(key) {
        delete this.data[key];
        return this.save();
    }

    async edit(key, callback) {
        return this.set(key, await callback(this.get(key)));
    }

    get(key, fallback) {
        return this.data[key] || fallback;
    }
};
