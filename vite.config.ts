import path from 'node:path';

import react from '@vitejs/plugin-react';
import appRoot from 'app-root-path';
import chokidar from 'chokidar';
import dts from 'unplugin-dts/vite';
import { defineConfig, esmExternalRequirePlugin, loadEnv, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

import { paths as paths_apps } from './build/ts/apps';
import { minify_html } from './build/ts/minify_html';
import { content_sript_csp_policy_error_fix } from './build/ts/plugins/replace';
import { watch } from './build/ts/plugins/watch';

const app_root = appRoot.path.replaceAll(path.sep, path.posix.sep);

const config = defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const paths = {
        build: path.join(app_root, 'build', 'ts'),
        ts: path.join(app_root, 'src', 'ts'),
    };

    return {
        build: {
            target: 'esnext',
            lib: {
                entry: {
                    'build/ts/apps': path.join(paths.build, 'apps.ts'),
                    'build/ts/dependencies': path.join(paths.build, 'dependencies.ts'),
                    'build/ts/env': path.join(paths.build, 'env.ts'),
                    'build/ts/locales': path.join(paths.build, 'locales.ts'),
                    'build/ts/project_name': path.join(paths.build, 'project_name.ts'),
                    'build/ts/projects_path': path.join(paths.build, 'projects_path.ts'),
                    'build/ts/plugins/watch': path.join(paths.build, 'plugins', 'watch.ts'),
                    'build/ts/vite.config': path.join(paths.build, 'vite.config.ts'),
                    'build/ts/ext/manifest': path.join(paths.build, 'ext', 'manifest.ts'),
                    ext: path.join(paths.ts, 'ext.ts'),
                    app: path.join(paths.ts, 'app.ts'),
                    shared: path.join(paths.ts, 'shared.ts'),
                    shared_clean: path.join(paths.ts, 'shared_clean.ts'),
                    inputs: path.join(paths.ts, 'inputs.ts'),
                    settings: path.join(paths.ts, 'settings.ts'),
                    announcement: path.join(paths.ts, 'announcement.ts'),
                    dependencies: path.join(paths.ts, 'dependencies.ts'),
                },
            },
            watch: {},
            sourcemap: mode === 'development',
            license: { fileName: 'dependencies.json' },
            rolldownOptions: {
                output: [
                    {
                        format: 'es',
                        entryFileNames: '[name].mjs',
                        chunkFileNames: 'chunks/[name].mjs',
                        minify: mode === 'production',
                    },
                ],
                external: (id: string, importer: string | undefined) => {
                    const normalized_importer: string = importer ? normalizePath(importer) : '';
                    const is_node_entry = normalized_importer.includes('/build/');

                    const node_externals = [
                        // All imported modules in build/ need to here, otherwise error
                        'vite',
                        '@vitejs/plugin-react',
                        'vite-plugin-svgr',
                        'vite-plugin-static-copy',
                        'fs-extra',
                        'is-empty-dir',
                        'node:path',
                        'node:child_process',
                    ];

                    if (is_node_entry && node_externals.includes(id)) {
                        return true;
                    }

                    return false;
                },
                onwarn(warning, warn) {
                    if (warning.message?.includes('externalized for browser compatibility')) {
                        return;
                    }

                    warn(warning);
                },
                plugins: [
                    esmExternalRequirePlugin({
                        external: ['react', 'react-dom'],
                    }),
                ],
            },
        },
        plugins: [
            watch({
                paths_to_watch: [
                    path.join(app_root, 'build', 'ps1'),
                    path.join(paths.build),
                    path.join(app_root, 'src', '_locales'),
                    path.join(app_root, 'src', 'fonts'),
                    path.join(app_root, 'src', 'html'),
                    path.join(app_root, 'src', 'scss'),
                    path.join(app_root, 'src', 'svg'),
                ],
                reload_trigger_file: path.join(paths.ts, 'shared.ts'),
                chokidar,
            }),
            content_sript_csp_policy_error_fix(),
            dts(),
            react(),
            svgr({
                include: '**/*.svg',
            }),
            viteStaticCopy({
                targets: [
                    {
                        src: ['LICENSE.md', 'src/ts/custom.d.ts', 'build/ps1'],
                        dest: '',
                    },
                    {
                        src: [`json/${env.env}/package.json`],
                        dest: '',
                        rename: { stripBase: true },
                    },
                    {
                        src: ['src/html'],
                        dest: '',
                        rename: { stripBase: 1 },
                        transform: (contents: string) => minify_html({ mode, contents }),
                    },
                    {
                        src: ['src/scss', 'src/imgs', 'src/fonts', 'src/_locales'],
                        dest: '',
                        rename: { stripBase: 1 },
                    },
                    ...paths_apps.env,
                    ...paths_apps.oxlintrc,
                    ...paths_apps.oxfmtrc,
                    ...paths_apps.stylelintrc,
                ],
            }),
        ],
    };
});

export default config;
