const {promisify} = require('util');
const stat = promisify(require('fs').stat);
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

module.exports = class Memory {

    constructor(filename) {
        this.filename = filename;
        this.data = {};
    }

    async save() {
        return writeFile(this.filename, JSON.stringify(this.data, null, '  '));
    }

    async load() {
        try {
            this.data = JSON.parse(await readFile(this.filename));
        } catch (error) {
            this.data = {};
        }
    }

    get(key) {
        return this.data[key] || null;
    }

    set(key, value) {
        this.data[key] = value;
        this.save();
    }
};
