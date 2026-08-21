import type { Target } from 'vite-plugin-static-copy';

import path from 'node:path';

import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

import { is_ext } from './apps';
import { generate_env } from './env';
import { minify_html } from './minify_html';
import { content_sript_csp_policy_error_fix } from './plugins/replace';
import { generate_vite_plugin_static_copy_items } from './static_assets';

const generate_shared_config = ({
    mode,
    env,
    app_root,
    dest_path,
    copy_paths,
    callback_build_start,
    callback_close_bundle,
}: {
    mode: string;
    env: Record<string, string>;
    app_root: string;
    dest_path: string;
    copy_paths: Target[];
    callback_build_start?: () => undefined;
    callback_close_bundle?: ({ build_error }: { build_error: boolean }) => undefined;
}) => {
    let build_error: boolean = false;
    const shared_folder_name = `shared${is_ext() ? '' : '-app'}`;
    const shared_path: string = path.join(
        app_root,
        'node_modules',
        '@loftyshaky',
        shared_folder_name,
        'scss',
        'shared',
    );
    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
        embed: path.join(shared_path, 'embed'),
        themes: path.join(shared_path, 'themes', 'general'),
    };

    const copy_paths_2: Target[] = [
        ...copy_paths,
        {
            src: path.posix.join(app_root, 'node_modules', '@loftyshaky', 'shared', 'html'),
            dest: dest_path,
            rename: { stripBase: true },
        },
        {
            src: path.posix.join(app_root, 'node_modules', '@loftyshaky', 'shared', 'imgs'),
            dest: dest_path,
            rename: { stripBase: true },
        },
        {
            src: path.posix.join(app_root, 'src', 'html'),
            dest: dest_path,
            rename: { stripBase: true },
            transform: (contents: string) => minify_html({ mode, contents }),
        },
    ];

    if (env.env === 'app') {
        copy_paths_2.push({
            src: path.posix.join(app_root, 'package.json'),
            dest: dest_path,
            rename: { stripBase: true },
        });
    }

    if (['ext', 'app'].includes(env.env)) {
        copy_paths_2.push(
            {
                src: path.posix.join(app_root, 'src', 'icons'),
                dest: dest_path,
                rename: { stripBase: true },
            },
            {
                src: path.posix.join(app_root, 'node_modules', '@loftyshaky', 'shared', 'fonts'),
                dest: dest_path,
                rename: { stripBase: true },
            },
        );
    }

    const copy_patterns_final: Target[] =
        env.content_script === 'true'
            ? []
            : generate_vite_plugin_static_copy_items({
                  copy_paths: copy_paths_2,
              });

    return {
        define: {
            'process.env.NODE_ENV': JSON.stringify(mode),
            env: generate_env({ env, mode }),
        },
        resolve: { preserveSymlinks: true },
        build: {
            emptyOutDir: false,
            cssCodeSplit: true,
            target: 'esnext',
            lib: {
                entry:
                    env.content_script === 'true'
                        ? {}
                        : {
                              announcement: path.join(paths.ts, 'announcement', 'announcement.ts'),
                              dependencies: path.join(paths.ts, 'dependencies', 'dependencies.ts'),
                              font_face: path.join(paths.embed, 'font_face.scss'),
                              no_tr: path.join(paths.embed, 'no_tr.scss'),
                              hidden_roots: path.join(paths.embed, 'hidden_roots.scss'),
                              error: path.join(paths.embed, 'error.scss'),
                              loading_screen: path.join(paths.embed, 'loading_screen.scss'),
                              announcement_css: path.join(
                                  app_root,
                                  'node_modules',
                                  '@loftyshaky',
                                  shared_folder_name,
                                  'scss',
                                  'announcement',
                                  'index.scss',
                              ),
                              dependencies_css: path.join(
                                  app_root,
                                  'node_modules',
                                  '@loftyshaky',
                                  shared_folder_name,
                                  'scss',
                                  'dependencies',
                                  'index.scss',
                              ),
                              light_theme: path.join(paths.themes, 'light_theme.scss'),
                              dark_theme: path.join(paths.themes, 'dark_theme.scss'),
                              very_dark_theme: path.join(paths.themes, 'very_dark_theme.scss'),
                              clover_theme: path.join(paths.themes, 'clover_theme.scss'),
                              aqua_theme: path.join(paths.themes, 'aqua_theme.scss'),
                              lavender_theme: path.join(paths.themes, 'lavender_theme.scss'),
                              blaze_theme: path.join(paths.themes, 'blaze_theme.scss'),
                              ruby_theme: path.join(paths.themes, 'ruby_theme.scss'),
                          },
            },
            watch: {},
            sourcemap: mode === 'development',
            license: {
                fileName:
                    env.content_script === 'true'
                        ? 'dependencies_content_script.json'
                        : 'dependencies.json',
            },
            rolldownOptions: {
                output: [
                    {
                        format: env.content_script === 'true' ? 'iife' : 'es',
                        entryFileNames: `[name].${env.content_script === 'true' ? '' : 'm'}js`,
                        ...(env.content_script === 'true'
                            ? { name: 'content_script_u6Pgzb39sN1' }
                            : { chunkFileNames: 'chunks/[name].mjs' }),
                        minify: mode === 'production',
                    },
                ],
            },
        },
        plugins: [
            react(),
            svgr({
                include: '**/*.svg',
            }),
            content_sript_csp_policy_error_fix(),
            viteStaticCopy({
                targets: copy_patterns_final,
            }),
            {
                name: 'build_event',
                buildStart() {
                    if (callback_build_start) {
                        callback_build_start();
                    }
                },
                buildEnd(err: unknown) {
                    if (err) {
                        build_error = true;
                    }
                },
                closeBundle() {
                    if (callback_close_bundle) {
                        setTimeout(() => {
                            callback_close_bundle({ build_error });

                            if (env.exit_build === 'true') {
                                process.exit(1);
                            }
                        }, 200);
                    }

                    build_error = false;
                },
            },
        ],
    };
};

export { generate_shared_config };
