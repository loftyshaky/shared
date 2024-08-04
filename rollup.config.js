const path = require('path');

const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const svgr = require('@svgr/rollup');
const replace = require('@rollup/plugin-replace');
const terser = require('@rollup/plugin-terser');
const license = require('rollup-plugin-license');

const { TscAlias } = require('./js/shared/tsc_alias');
const copy = require('./js/shared/package/plugins/rollup-plugin-copy');
const watcher = require('./js/shared/package/plugins/watcher');
const { Terser } = require('./js/shared/package/terser');

const { Files } = require('./js/files');
const { paths } = require('./js/shared/apps');

const tsc_alias = new TscAlias();
const files = new Files();
const terserInst = new Terser();

const config = {
    input: [
        'src/ext.ts',
        'src/app.ts',
        'src/shared.ts',
        'src/shared_clean.ts',
        'src/inputs.ts',
        'src/settings.ts',
        'src/announcement.ts',
        'src/dependencies.ts',
    ],
    output: [
        {
            dir: 'dist',
            entryFileNames: '[name].js',
            chunkFileNames: 'chunk-[name].js',
            format: 'commonjs',
            sourcemap: false,
        },
    ],
    external: ['react', 'react-dom'],
    treeshake: true,
    watch: {
        clearScreen: false,
    },
    onwarn(warning, warn) {
        if (
            warning.code !== 'CIRCULAR_DEPENDENCY' &&
            warning.code === 'NON_EXISTENT_EXPORT' &&
            !warning.source.includes('\\interfaces\\')
        ) {
            warn(warning);
        }
    },
    plugins: [
        commonjs(),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        typescript({ tsconfig: './tsconfig.json' }),
        tsc_alias.transform_aliases_to_relative_paths(),
        svgr(),
        watcher({ mode: process.env.mode }),
        replace({
            'ext.': process.env.env === 'app' ? 'app.' : 'ext.',
        }),
        copy({
            targets: [
                {
                    src: `json/${process.env.env}/package.json`,
                    dest: 'dist',
                },
                {
                    src: 'src/globals.d.ts',
                    dest: 'dist',
                },
                {
                    src: 'LICENSE.md',
                    dest: 'dist',
                },
                {
                    src: 'src/html/*',
                    dest: 'dist/html',
                },
                {
                    src: 'js/shared/*',
                    dest: 'dist/js',
                },
                {
                    src: 'src/_locales',
                    dest: 'dist',
                },
                {
                    src: 'src/scss',
                    dest: 'dist',
                },
                {
                    src: 'src/imgs',
                    dest: 'dist',
                },
                {
                    src: 'src/fonts',
                    dest: 'dist',
                },
                {
                    src: '.eslintrc.js',
                    dest: paths.app,
                },
                {
                    src: '.prettierrc.js',
                    dest: paths.app,
                },
            ],
            hook: 'writeBundle',
            callback_start: async () => {
                await files.copy();
            },
        }),
        process.env.mode === 'production' ? terser(terserInst.config) : undefined,
        license({
            banner: "Copyright <%= moment().format('YYYY') %>",
            thirdParty: {
                includePrivate: true,
                output: {
                    file: path.join(__dirname, 'dist', 'dependencies.txt'),
                },
            },
        }),
    ],
};

module.exports = config;
