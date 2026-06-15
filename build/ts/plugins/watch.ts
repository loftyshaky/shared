import type { Plugin } from 'vite';

import path from 'node:path';

import fs from 'fs-extra';
import debounce from 'lodash/debounce';

const touch_file = ({
    app_root = '',
    reload_trigger_file,
}: {
    app_root?: string;
    reload_trigger_file?: string;
}) => {
    const now = new Date();

    fs.utimesSync(
        reload_trigger_file
            ? reload_trigger_file
            : path.join(app_root, 'src', 'ts', 'background.ts'),
        now,
        now,
    ); // updates the watched by vite file timestamps to trigger rebuild
};

let is_watching: boolean = false;
const touch_file_debounced = debounce(touch_file, 200);

const watch = ({
    app_root = '',
    paths_to_watch,
    reload_trigger_file,
    chokidar,
}: {
    app_root?: string;
    paths_to_watch: string[];
    reload_trigger_file?: string;
    // oxlint-disable-next-line typescript/no-explicit-any
    chokidar: any;
}): Plugin => {
    return {
        name: 'watch',
        buildStart() {
            if (!is_watching) {
                const watcher = chokidar.watch(paths_to_watch, {
                    ignoreInitial: true,
                });

                watcher.on('all', () => {
                    touch_file_debounced({ app_root, reload_trigger_file });
                });

                is_watching = true;
            }
        },
    };
};

const get_shared_dist_path = ({
    app_root,
    env,
}: {
    app_root: string;
    env: Record<string, string>;
}) => {
    const root_final: string = path.join(
        app_root,
        'node_modules',
        '@loftyshaky',
        `shared${env.env === 'app' ? '-app' : ''}`,
    );
    console.log(root_final);
    return root_final;
};

export { watch, get_shared_dist_path };
