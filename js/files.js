import path from 'path';
import fs from 'fs-extra';
import { magentaBright } from 'colorette';

import {
    paths,
    apps,
    app_types,
} from './apps';

export class Files {
    copy = async () => {
        const src_js_shared_path = path.join(
            __dirname,
            'js',
            'loftyshaky',
            'shared',
        );

        const src_js_package_path = path.join(
            __dirname,
            'js',
            'loftyshaky',
            'package',
        );

        const src_locales_path = path.join(
            __dirname,
            'src',
            '_locales',
        );

        const src_stylelintrc_path = path.join(
            __dirname,
            '.stylelintrc',
        );

        apps.forEach((app, i) => {
            if (app_types[i] === 'ext') {
                fs.copySync(
                    src_js_shared_path,
                    paths.js_shared[i],
                );

                fs.copySync(
                    src_locales_path,
                    paths.locales[i],
                );

                fs.copySync(
                    src_stylelintrc_path,
                    paths.stylelintrc[i],
                );
            } else if (app_types[i] === 'package') {
                fs.copySync(
                    src_js_package_path,
                    paths.js_package[i],
                );
            }
        });

        // eslint-disable-next-line no-console
        console.log(magentaBright('Copied files'));
    }
}
