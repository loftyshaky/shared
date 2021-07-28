const path = require('path');
const fs = require('fs-extra');

const { paths, apps, app_types } = require('./apps');

class Files {
    copy = () => {
        const src_stylelintrc_path = path.resolve('.stylelintrc.json');
        apps.forEach((app, i) => {
            if (['app', 'ext'].includes(app_types[i])) {
                fs.copySync(src_stylelintrc_path, paths.stylelintrc[i]);
            }
        });
    };
}
module.exports = { Files };
