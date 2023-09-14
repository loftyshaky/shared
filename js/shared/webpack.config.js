const path = require('path');

const { is_ext } = require('./apps');

const shared_config = ({
    app_type,
    app_root,
    webpack,
    argv,
    env,
    TerserPlugin,
    MiniCssExtractPlugin,
    CssMinimizerPlugin,
    CopyWebpackPlugin,
    copy_patters,
    minimize = true,
    enable_anouncement,
    callback_begin = () => undefined,
    callback_done = () => undefined,
}) => {
    const shared_path = path.join(
        app_root,
        'node_modules',
        '@loftyshaky',
        `shared${is_ext() ? '' : '-app'}`,
        'scss',
        'shared',
    );

    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
        embed: path.join(shared_path, 'embed'),
        themes: path.join(shared_path, 'themes', 'general'),
    };

    const external_copy_patterns = copy_patters || [];
    const copy_patterns_final = [
        ...external_copy_patterns,
        ...[
            {
                from: path.join(app_root, 'node_modules', '@loftyshaky', 'shared', 'html'),
                noErrorOnMissing: true,
                globOptions: {
                    ignore: enable_anouncement ? [] : ['**/announcement.html'],
                },
            },
            {
                from: path.join(app_root, 'node_modules', '@loftyshaky', 'shared', 'imgs'),
                noErrorOnMissing: true,
            },
            {
                from: path.join(app_root, 'src', 'html'),
            },
        ],
    ];

    if (app_type === 'app') {
        copy_patterns_final.push({
            from: path.join(app_root, 'src', 'icons'),
        });

        copy_patterns_final.push({ from: path.join(app_root, 'package.json') });
    }

    if (app_type === 'ext') {
        copy_patterns_final.push(
            {
                from: path.join(app_root, 'src', 'icons', 'all'),
            },
            {
                from: path.join(app_root, 'src', 'icons', env.browser),
            },
        );
    }

    return {
        entry: {
            ...(enable_anouncement && {
                announcement: path.join(paths.ts, 'announcement', 'announcement.ts'),
            }),
            font_face: path.join(paths.embed, 'font_face.scss'),
            no_tr: path.join(paths.embed, 'no_tr.scss'),
            hidden_roots: path.join(paths.embed, 'hidden_roots.scss'),
            error: path.join(paths.embed, 'error.scss'),
            loading_screen: path.join(paths.embed, 'loading_screen.scss'),
            ...(enable_anouncement && {
                announcement_css: path.join(
                    app_root,
                    'node_modules',
                    '@loftyshaky',
                    'shared',
                    'scss',
                    'announcement',
                    'index.scss',
                ),
            }),
            light_theme: path.join(paths.themes, 'light_theme.scss'),
            dark_theme: path.join(paths.themes, 'dark_theme.scss'),
            very_dark_theme: path.join(paths.themes, 'very_dark_theme.scss'),
            lavender_theme: path.join(paths.themes, 'lavender_theme.scss'),
            aqua_theme: path.join(paths.themes, 'aqua_theme.scss'),
        },
        output: {
            filename: '[name].js',
            chunkFilename: 'chunks/[name].js',
            path: path.join(app_root, 'dist'),
            publicPath: '',
        },
        resolve: {
            alias: {
                shared: path.join(paths.ts, 'shared'),
                ...(app_type === 'ext' && {
                    background: path.join(paths.ts, 'background'),
                    settings: path.join(paths.ts, 'settings'),
                    content_script: path.join(paths.ts, 'content_script'),
                }),
                ...(enable_anouncement && {
                    announcement: path.join(paths.ts, 'announcement'),
                }),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            fallback: {
                crypto: false,
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                },
                {
                    test: /\.(scss|css)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.woff2?$/,
                    type: 'asset/resource',
                    generator: {
                        filename: '[name][ext]',
                    },
                },
            ],
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin(),
            new CopyWebpackPlugin({
                patterns: copy_patterns_final,
            }),
            {
                apply: (compiler) => {
                    compiler.hooks.initialize.tap('initialize', callback_begin);
                    compiler.hooks.done.tap('done', callback_done);
                },
            },
        ],
        target: 'web',
        devtool: false,
        optimization: {
            minimize: minimize && argv.mode === 'production',
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
            sideEffects: argv.mode === 'production',
        },
        performance: {
            maxEntrypointSize: 52428800,
            maxAssetSize: 52428800,
        },
    };
};

module.exports = { shared_config };
