const path = require('path');

const shared_config = ({
    app_root,
    webpack,
    argv,
    env,
    MiniCssExtractPlugin,
    OptimizeCssAssetsPlugin,
    // FixStyleOnlyEntriesPlugin,
    CopyWebpackPlugin,
    copy_patters,
    callback_begin,
    callback_done,
}) => {
    const shared_path = path.join(
        app_root,
        'node_modules',
        '@loftyshaky',
        'shared',
        'scss',
        'shared',
    );
    const paths = {
        ts: path.join(app_root, 'src', 'ts'),
        embed: path.join(shared_path, 'embed'),
        themes: path.join(shared_path, 'themes', 'general'),
    };

    const copy_patterns_final = copy_patters || [];

    return {
        entry: {
            font_face: path.join(paths.embed, 'font_face.scss'),
            no_tr: path.join(paths.embed, 'no_tr.scss'),
            error: path.join(paths.embed, 'error.scss'),
            loading_screen: path.join(paths.embed, 'loading_screen.scss'),
            light_theme: path.join(paths.themes, 'light_theme.scss'),
            dark_theme: path.join(paths.themes, 'dark_theme.scss'),
            very_dark_theme: path.join(paths.themes, 'very_dark_theme.scss'),
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
                background: path.join(paths.ts, 'background'),
                settings: path.join(paths.ts, 'settings'),
                content_script: path.join(paths.ts, 'content_script'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                },
                {
                    test: /\.(scss)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin(),
            new OptimizeCssAssetsPlugin(),
            // new FixStyleOnlyEntriesPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    ...[
                        {
                            from: path.join(app_root, 'src', 'html'),
                        },
                        {
                            from: path.join(app_root, 'src', 'icons', 'all'),
                        },
                        {
                            from: path.join(app_root, 'src', 'icons', env.browser),
                        },
                    ],
                    ...copy_patterns_final,
                ],
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
            sideEffects: argv.mode === 'production',
        },
        performance: {
            maxEntrypointSize: 52428800,
            maxAssetSize: 52428800,
        },
    };
};

module.exports = { shared_config };
