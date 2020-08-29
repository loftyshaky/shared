import path from 'path';

import { ProjectName } from './loftyshaky/package/project_name';
import { absolute_paths } from '../../../absolute_paths';

const project_name = new ProjectName();

export const apps = [
    'Extension Reloader Watch 1',
    'Extension Reloader Watch 2',
    'Extension Reloader',
    'Base64 font-face',
];
export const app_ids = [
    '',
    '',
    'u6Pgzb39sN0',
    'u6Pgzb39sN1',
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

const create_js_paths = () => app.map((app_dir) => path.join(
    app_dir,
    'js',
    'loftyshaky',
));

const js = create_js_paths();

const create_js_shared_paths = () => js.map((js_dir) => path.join(
    js_dir,
    'shared',
));

const js_shared = create_js_shared_paths();

const create_js_package_paths = () => js.map((js_dir) => path.join(
    js_dir,
    'package',
));

const js_package = create_js_package_paths();

const create_scss_paths = () => app.map((app_dir) => path.join(
    app_dir,
    'src',
    'scss',
    'loftyshaky',
    'shared',
));

const scss = create_scss_paths();

const create_css_paths = () => app.map((app_dir) => path.join(
    app_dir,
    'src',
    'css',
));

const css = create_css_paths();

const create_node_molules_paths = () => app.map((app_dir) => path.join(
    app_dir,
    'node_modules',
    '@loftyshaky',
    'shared',
));

const node_molules = create_node_molules_paths();

const create_locales_paths = () => node_molules.map((node_molules_name_dir) => path.join(
    node_molules_name_dir,
    '_locales',
));

const locales = create_locales_paths();

export const paths = {
    app,
    eslintrc,
    stylelintrc,
    js_shared,
    js_package,
    scss,
    css,
    node_molules,
    locales,
};
