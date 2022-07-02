const path = require('path');

const { projects_path } = require('./projects_path');
const { ProjectName } = require('./project_name');

const project_name = new ProjectName();

const apps = [
    'Advanced Extension Reloader Watch 1',
    'Advanced Extension Reloader Watch 2',
    'Browservery',
    'App Puppeteer',
    'Stock Screener',
    'Advanced Extension Reloader',
    'Search Enhancer for Google',
    'Clear New Tab',
    'Base64 font-face',
];

const app_types = ['package', 'package', 'app', 'app', 'app', 'ext', 'ext', 'ext'];

const create_app_paths = () =>
    apps.map((project) => path.join(projects_path.q, project, project_name.transform({ project })));

const app = create_app_paths();

const create_eslintrc_paths = () => app.map((app_dir) => path.join(app_dir, '.eslintrc.js'));

const eslintrc = create_eslintrc_paths();

const create_prettierrc_paths = () => app.map((app_dir) => path.join(app_dir, '.prettierrc.js'));

const prettierrc = create_prettierrc_paths();

const create_stylelintrc_paths = () =>
    app.map((app_dir) => path.join(app_dir, '.stylelintrc.json'));

const stylelintrc = create_stylelintrc_paths();

const is_ext = ({ app_root }) => {
    const current_app_name = path.basename(path.dirname(app_root));

    const app_i = apps.findIndex((app_name) => app_name === current_app_name);

    return app_types[app_i] === 'ext';
};

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
    is_ext,
};