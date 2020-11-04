import path from 'path';
import fs from 'fs-extra';
import { magentaBright } from 'colorette';

import {
    paths,
    app_ids,
    app_types,
} from './apps';

export class Styles {
    scss_shared_path = path.join(
        'src',
        'scss',
        'loftyshaky',
        'shared',
    );

    compile_and_copy = async () => {
        app_ids.forEach((app_id, i) => {
            if (app_types[i] === 'ext') {
                fs.readdirSync(path.join(
                    this.scss_shared_path,
                )).forEach((file) => {
                    const dest = path.join(
                        paths.scss[i],
                        file,
                    );
                    const src = path.join(
                        __dirname,
                        this.scss_shared_path,
                        file,
                    );

                    if (file === 'vars.scss') {
                        const content = fs.readFileSync(
                            src,
                            'utf8',
                        );

                        this.output_css({
                            dest,
                            data: content.toString(),
                            app_id,
                        });
                    } else {
                        fs.copySync(
                            src,
                            dest,
                        );
                    }
                });
            }
        });

        // eslint-disable-next-line no-console
        console.log(magentaBright('Compiled scss'));
    }

    output_css = async ({ dest, data, app_id }) => {
        fs.outputFileSync(
            dest,
            Buffer.from(data.toString().replace(
                /replaced_by_compile_scss_file/g,
                app_id,
            )),
        );
    }
}
