const path = require('path');
const fs = require('fs-extra');

const {
    paths,
    apps,
    app_types,
} = require('./apps');

class Files {
    copy = () => {
        const src_stylelintrc_path = path.resolve(
            '.stylelintrc',
        );
        apps.forEach((app, i) => {
            if (app_types[i] === 'ext') {
                fs.copySync(
                    src_stylelintrc_path,
                    paths.stylelintrc[i],
                );
            }
        });
    }
}
module.exports = { Files };
