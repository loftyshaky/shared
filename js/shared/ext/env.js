import path from 'path';
import fs from 'fs-extra';

export class Env {
     generate = () => {
         const env = `window.env = { browser: '${process.env.browser}' }; // eslint-disable-line eol-last`;

         fs.outputFileSync(
             path.join(
                 __dirname,
                 'build',
                 'env.js',
             ),
             env,
             'utf-8',
         );
     }
}
