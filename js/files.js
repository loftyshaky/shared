import path from 'path';
import fs from 'fs-extra';

import {
    paths,
    apps,
    app_types,
} from './apps';

export class Files {
    copy = () => {
        const src_stylelintrc_path = path.join(
            __dirname,
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
