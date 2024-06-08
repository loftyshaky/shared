const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');

const { ProjectName } = require('./project_name');

const project_name = new ProjectName();

class TaskScheduler {
    unlock_dist = async ({ package_name, remove_dist }) => {
        const is_windows = process.platform === 'win32';

        if (
            (is_windows &&
                fs.existsSync(path.join('C:', 'Program Files', 'LockHunter', 'LockHunter.exe'))) ||
            !is_windows
        ) {
            if (is_windows) {
                try {
                    childProcess.execSync(
                        `SCHTASKS.EXE /RUN /TN "Unlock ${package_name} dist dir"`,
                    );
                } catch {
                    /* empty */
                }
            }

            if (remove_dist) {
                // eslint-disable-next-line global-require
                const { projects_path } = require('./projects_path');

                fs.removeSync(
                    path.join(
                        projects_path.q,
                        package_name,
                        project_name.transform({ project: package_name }),
                        'dist',
                    ),
                );
            }
        }
    };
}

module.exports = { TaskScheduler };
