const path = require('path');
const fs = require('fs-extra');

class Env {
    constructor({ app_root }) {
        this.app_root = app_root;
    }

    generate = ({ browser, mode }) => {
        const env = `globalThis.env = { "browser": "${browser}", "mode": "${mode}" }`;

        fs.outputFileSync(path.join(this.app_root, 'dist', 'env.js'), env, 'utf-8');
    };
}

module.exports = { Env };
