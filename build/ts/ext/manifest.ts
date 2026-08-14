import path from 'node:path';

import fs from 'fs-extra';

class Manifest {
    private app_root: string = '';

    constructor({ app_root }: { app_root: string }) {
        this.app_root = app_root;
    }

    public generate = ({
        manifest,
        env,
        colored_icon = false,
    }: {
        manifest: Record<string, string>;
        env?: Record<string, string>;
        colored_icon?: boolean;
    }) => {
        const colored_icon_filename = ({
            size,
            force_colored = false,
        }: {
            size: number;
            force_colored?: boolean;
        }) =>
            colored_icon && ((env && ['edge', 'firefox'].includes(env.browser)) || force_colored)
                ? `icon_colored${size}.png`
                : `icon${size}.png`;

        // oxlint-disable-next-line typescript/no-explicit-any
        const shared_manifest: Record<string, any> = {
            manifest_version: 2,
            version: process.env.npm_package_version,
            default_locale: 'en',
            icons: {
                16: colored_icon_filename({ size: 16 }),
                24: colored_icon_filename({ size: 24 }),
                32: colored_icon_filename({ size: 32 }),
                48: colored_icon_filename({ size: 48 }),
                64: colored_icon_filename({ size: 64 }),
                96: colored_icon_filename({ size: 96 }),
                128: colored_icon_filename({ size: 128 }),
            },
            action: {
                default_icon: {
                    16: colored_icon_filename({ size: 16, force_colored: true }),
                    24: colored_icon_filename({ size: 24, force_colored: true }),
                    32: colored_icon_filename({ size: 32, force_colored: true }),
                    48: colored_icon_filename({ size: 48, force_colored: true }),
                    64: colored_icon_filename({ size: 64, force_colored: true }),
                    96: colored_icon_filename({ size: 96, force_colored: true }),
                    128: colored_icon_filename({ size: 128, force_colored: true }),
                },
            },
        };
        fs.outputFileSync(
            path.join(this.app_root, 'dist', 'manifest.json'),
            JSON.stringify({
                ...shared_manifest,
                ...manifest,
            }),
            'utf-8',
        );
    };
}

export { Manifest };
