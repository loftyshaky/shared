const path = require('path');
const fs = require('fs-extra');

class Env {
    constructor({ app_root }) {
        this.app_root = app_root;
    }

    generate = ({ browser, mode }) => {
        const env = `this.env = { browser: '${browser}', mode: '${mode}' }; // eslint-disable-line eol-last`;

        fs.outputFileSync(path.join(this.app_root, 'dist', 'env.js'), env, 'utf-8');
    };
}

module.exports = { Env };
