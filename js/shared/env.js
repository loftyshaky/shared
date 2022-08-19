const path = require('path');
const fs = require('fs-extra');

class Env {
    constructor({ app_root }) {
        this.app_root = app_root;
    }

    generate = ({ browser, mode, env }) => {
        const env_2 = `globalThis.env = {"version": "${process.env.npm_package_version}", "browser": "${browser}", "mode": "${mode}", "env": "${env}" }`;

        fs.outputFileSync(
            path.join(
                this.app_root,
                env === 'adonis_app' ? path.join('public', 'assets') : 'dist',
                'env.js',
            ),
            env_2,
            'utf-8',
        );
    };
}

module.exports = { Env };
