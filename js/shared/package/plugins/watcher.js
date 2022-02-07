const path = require('path');

const appRoot = require('app-root-path').path;
const recursiveReaddir = require('recursive-readdir');
const _ = require('lodash');

const { TaskScheduler } = require('../../task_scheduler');

const task_scheduler = new TaskScheduler();

let initial_run_completed = false;

const generate_watch_files = async () => {
    let watch_files = [];

    const src_dir = path.join(appRoot, 'src');

    const dirs = [
        path.join(appRoot, 'js'),
        path.join(src_dir, '_locales'),
        path.join(src_dir, 'scss'),
    ];

    await Promise.all(
        dirs.map(async (dir) => {
            const files = await recursiveReaddir(dir);

            watch_files = _.union(watch_files, files);
        }),
    );

    return watch_files;
};

module.exports = function watcher({ mode }) {
    return {
        async buildStart() {
            if (!initial_run_completed) {
                await task_scheduler.unlock_dist({
                    package_name: 'Shared',
                    remove_dist: mode === 'production',
                });

                initial_run_completed = true;
            }

            const watch_files = await generate_watch_files();

            watch_files.forEach((file) => {
                this.addWatchFile(file);
            });
        },
    };
};
