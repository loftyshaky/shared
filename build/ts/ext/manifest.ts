import path from 'node:path';

import fs from 'fs-extra';

class Manifest {
    private app_root: string = '';

    constructor({ app_root }: { app_root: string }) {
        this.app_root = app_root;
    }

    public generate = ({
        manifest,
        add_colored_icon = false,
    }: {
        manifest: Record<string, string>;
        add_colored_icon?: boolean;
    }) => {
        const colored_icon_filename = ({ size }: { size: number }) =>
            add_colored_icon ? `icon_colored${size}.png` : `icon${size}.png`;

        // oxlint-disable-next-line typescript/no-explicit-any
        const shared_manifest: Record<string, any> = {
            manifest_version: 2,
            version: process.env.npm_package_version,
            default_locale: 'en',
            icons: {
                16: 'icon16.png',
                24: 'icon24.png',
                32: 'icon32.png',
                48: 'icon48.png',
                64: 'icon64.png',
                96: 'icon96.png',
                128: 'icon128.png',
            },
            action: {
                default_icon: {
                    16: colored_icon_filename({ size: 16 }),
                    24: colored_icon_filename({ size: 24 }),
                    32: colored_icon_filename({ size: 32 }),
                    48: colored_icon_filename({ size: 48 }),
                    64: colored_icon_filename({ size: 64 }),
                    96: colored_icon_filename({ size: 96 }),
                    128: colored_icon_filename({ size: 128 }),
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
