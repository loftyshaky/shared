const path = require('path');
const fs = require('fs-extra');

class Manifest {
    constructor({ app_root }) {
        this.app_root = app_root;
    }

    generate = ({ manifest, browser, add_colored_icon = false }) => {
        const colored_icon_filename = ({ size }) =>
            add_colored_icon ? `icon_colored${size}.png` : `icon${size}.png`;
        const shared_manifest = {
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

        if (browser === 'firefox') {
            shared_manifest.applications = {
                gecko: {
                    id: `${process.env.npm_package_name}@loftyshaky`,
                },
            };
        }

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

module.exports = { Manifest };
