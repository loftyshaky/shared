const child_process = require('child_process');

class TscAlias {
    transform_aliases_to_relative_paths = () => ({
        name: 'tsAlias',
        writeBundle: () =>
            new Promise((resolve, reject) => {
                child_process.exec('tsc-alias', function callback(error, stdout, stderr) {
                    if (stderr || error) {
                        reject(stderr || error);
                    } else {
                        resolve(stdout);
                    }
                });
            }),
    });
}

module.exports = { TscAlias };
