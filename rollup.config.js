import typescript2 from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import transformPaths from 'ts-transform-paths';
import svgr from '@svgr/rollup';
import scss from 'rollup-plugin-scss';
import del from 'rollup-plugin-delete';
import watcher from './js/loftyshaky/shared/plugins/watcher';
import copy from './js/loftyshaky/shared/plugins/rollup-plugin-copy';

import { paths } from './js/apps';
import { Delete } from './js/delete';
import { Files } from './js/files';
import { Styles } from './js/styles';

const delete_inst = new Delete();
const files = new Files();
const styles = new Styles();

const config = {
    input: 'src/index.ts',
    output: [{
        file: 'build/index.js',
        format: 'es',
        exports: 'named',
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
        scss(),
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
                    src: 'src/_locales',
                    dest: 'build',
                },
                {
                    src: '.eslintrc.js',
                    dest: paths.app,
                },
                {
                    src: 'build/*',
                    dest: paths.node_molules,
                },
            ],
            hook: 'writeBundle',
            callback_start: async () => {
                await delete_inst.delete_by_path();
                styles.compile_and_copy();
                files.copy();
            },
        }),
    ],
};

export default config;
