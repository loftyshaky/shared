const path = require('path');
const fs = require('fs-extra');

class Env {
    constructor({ app_root }) {
        this.app_root = app_root;
    }

     generate = ({ browser }) => {
         const env = `window.env = { browser: '${browser}' }; // eslint-disable-line eol-last`;

         fs.outputFileSync(
             path.join(
                 this.app_root,
                 'dist',
                 'env.js',
             ),
             env,
             'utf-8',
         );
     }
}

module.exports = { Env };
