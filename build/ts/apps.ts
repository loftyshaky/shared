import type { VitePluginStaticCopyItem } from './interfaces/vite_plugin_static_copy_item';

import path from 'node:path';

import fs from 'fs-extra';

import { ProjectName } from './project_name';
import { projects_path } from './projects_path';

const project_name = new ProjectName();

const apps: string[] = [
    'Advanced Extension Reloader Watch 1',
    'Advanced Extension Reloader Watch 2',
    'Keymeleon',
    'App Puppeteer',
    'Anki Note Type Shared',
    'Advanced Extension Reloader',
    'Search Enhancer for Google',
    'Close Other Tabs Plus',
    'Clear New Tab',
    'Base64 font-face',
    'Advanced Extension Reloader Examples',
];

const app_types: string[] = [
    'package',
    'package',
    'app',
    'app',
    'app',
    'ext',
    'ext',
    'ext',
    'ext',
    'ext',
    'ext',
];

const create_app_paths = (): string[] =>
    apps.map((project: string) =>
        path.join(projects_path, project, project_name.transform({ project })),
    );

const app = create_app_paths();

const create_paths = ({
    filename,
    exclude_types = [],
}: {
    filename: string;
    exclude_types?: string[];
}): VitePluginStaticCopyItem[] =>
    app.flatMap((app_dir: string, i: number): VitePluginStaticCopyItem[] =>
        exclude_types.includes(app_types[i]) || !fs.existsSync(app_dir)
            ? []
            : [
                  {
                      src: filename,
                      dest: app_dir,
                  },
              ],
    );

const env = create_paths({ filename: '.env' });
const oxlintrc = create_paths({ filename: '.oxlintrc.json' });
const oxfmtrc = create_paths({ filename: '.oxfmtrc.json' });
const stylelintrc = create_paths({
    filename: '.stylelintrc.json',
    exclude_types: ['package'],
});

const is_ext = (): boolean => {
    const { name } = fs.readJSONSync(path.resolve('package.json'));

    const app_i: number = apps.findIndex(
        (app_name) => project_name.transform({ project: app_name }) === name,
    );

    return app_types[app_i] === 'ext';
};

const paths = {
    env,
    oxlintrc,
    oxfmtrc,
    stylelintrc,
};

export { app_types, apps, is_ext, paths };
