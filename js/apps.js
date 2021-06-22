const path = require('path');

const { absolute_paths } = require('../../../absolute_paths');
const { ProjectName } = require('./shared/project_name');

const project_name = new ProjectName();

const apps = [
    'Advanced Extension Reloader Watch 1',
    'Advanced Extension Reloader Watch 2',
    'Advanced Extension Reloader',
    'Google Enhancement Suite',
    'Base64 font-face',
];

const app_types = ['package', 'package', 'ext', 'ext', 'ext'];

const create_app_paths = () =>
    apps.map((project) =>
        path.join(absolute_paths.q, project, project_name.transform({ project })),
    );

const app = create_app_paths();

const create_eslintrc_paths = () => app.map((app_dir) => path.join(app_dir, '.eslintrc.js'));

const eslintrc = create_eslintrc_paths();

const create_prettierrc_paths = () => app.map((app_dir) => path.join(app_dir, '.prettierrc.js'));

const prettierrc = create_prettierrc_paths();

const create_stylelintrc_paths = () => app.map((app_dir) => path.join(app_dir, '.stylelintrc'));

const stylelintrc = create_stylelintrc_paths();

const paths = {
    app,
    eslintrc,
    prettierrc,
    stylelintrc,
};

module.exports = {
    apps,
    app_types,
    paths,
};
