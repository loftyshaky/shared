import path from 'path';

import { ProjectName } from './project_name';
import { absolute_paths } from '../../../absolute_paths';

const project_name = new ProjectName();

export const apps = [
    'Extension Reloader Watch 1',
    'Extension Reloader Watch 2',
    'Extension Reloader',
    'Base64 font-face',
];

export const app_types = [
    'package',
    'package',
    'ext',
    'ext',
];

const create_app_paths = () => apps.map((project) => path.join(
    absolute_paths.q,
    project,
    project_name.transform({ project }),
));

const app = create_app_paths();

const create_eslintrc_paths = () => app.map((app_dir) => path.join(
    app_dir,
    '.eslintrc.js',
));

const eslintrc = create_eslintrc_paths();

const create_stylelintrc_paths = () => app.map((app_dir) => path.join(
    app_dir,
    '.stylelintrc',
));

const stylelintrc = create_stylelintrc_paths();

export const paths = {
    app,
    eslintrc,
    stylelintrc,
};
