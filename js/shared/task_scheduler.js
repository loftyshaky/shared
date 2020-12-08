const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');

const { absolute_paths } = require('../../../../absolute_paths');
const { ProjectName } = require('./project_name');

const project_name = new ProjectName();

class TaskScheduler {
    unlock_dist = async ({
        package_name,
        remove_dist,
    }) => {
        if (
            fs.existsSync(
                path.join(
                    'C:',
                    'Program Files',
                    'LockHunter',
                    'LockHunter.exe',
                ),
            )
        ) {
            childProcess.execSync(`SCHTASKS.EXE /RUN /TN "Unlock ${package_name} dist dir"`);

            if (remove_dist) {
                fs.removeSync(
                    path.join(
                        absolute_paths.q,
                        package_name,
                        project_name.transform({ project: package_name }),
                        'dist',
                    ),
                );
            }
        }
    }
}

module.exports = { TaskScheduler };
