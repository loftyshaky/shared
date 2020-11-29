import typescript2 from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import transformPaths from 'ts-transform-paths';
import svgr from '@svgr/rollup';
import scss from 'rollup-plugin-scss';
import del from 'rollup-plugin-delete';
import watcher from './js/build/ext/plugins/watcher';
import copy from './js/build/shared/plugins/rollup-plugin-copy';

import { paths } from './js/apps';
import { Delete } from './js/delete';
import { Files } from './js/files';

const delete_inst = new Delete();
const files = new Files();

const config = {
    input: [
        'src/index.ts',
        'src/inputs.ts',
        'src/settings.ts',
    ],
    output: [{
        dir: 'build',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunk-[name]-[hash].js',
        format: 'es',
        sourcemap: false,
    }],
    treeshake: true,
    watch: {
        clearScreen: false,
    },
    onwarn(warning, warn) {
        if (warning.code !== 'CIRCULAR_DEPENDENCY' && (warning.code === 'NON_EXISTENT_EXPORT' && !warning.source.includes('\\interfaces\\'))) {
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
        json({
            compact: true,
        }),
        resolve({
            browser: true,
            preferBuiltins: false,
        }),
        svgr(),
        scss({ includePaths: ['node_modules/'] }),
        del({
            targets: 'build',
        }),
        watcher(),
        copy({
            targets: [
                {
                    src: 'package.json',
                    dest: 'build',
                },
                {
                    src: 'js/build/*',
                    dest: 'build/js',
                },
                {
                    src: 'src/_locales',
                    dest: 'build',
                },
                {
                    src: 'src/scss',
                    dest: 'build',
                },
                {
                    src: '.eslintrc.js',
                    dest: paths.app,
                },
            ],
            hook: 'writeBundle',
            callback_start: async () => {
                await delete_inst.delete_by_path();
                await files.copy();
            },
        }),
    ],
};

export default config;
