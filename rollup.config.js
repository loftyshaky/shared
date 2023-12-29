import path from 'path';

import typescript2 from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import transformPaths from 'ts-transform-paths';
import svgr from '@svgr/rollup';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';

const copy = require('./js/shared/package/plugins/rollup-plugin-copy');
const watcher = require('./js/shared/package/plugins/watcher');
const { Terser } = require('./js/shared/package/terser');

const { Files } = require('./js/files');
const { paths } = require('./js/shared/apps');

const files = new Files();
const terserInst = new Terser();

const config = {
    input: [
        'src/ext.ts',
        'src/app.ts',
        'src/index.ts',
        'src/inputs.ts',
        'src/settings.ts',
        'src/announcement.ts',
        'src/dependencies.ts',
    ],
    output: [
        {
            dir: 'dist',
            entryFileNames: '[name].js',
            chunkFileNames: 'chunk-[name]-[hash].js',
            format: 'commonjs',
            sourcemap: false,
        },
    ],
    external: ['react', 'react-dom'],
    treeshake: process.env.mode === 'production',
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
        typescript2({
            rollupCommonJSResolveHack: true,
            clean: true,
            transformers: [transformPaths],
        }),
        commonjs(),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
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

export default config;
