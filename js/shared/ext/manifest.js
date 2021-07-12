const path = require('path');
const fs = require('fs-extra');

class Manifest {
    constructor({ app_root }) {
        this.app_root = app_root;
    }

    generate = ({ manifest, mode, browser }) => {
        const shared_manifest = {
            manifest_version: 2,
            version: process.env.npm_package_version,
            default_locale: 'en',
            icons: {
                16: 'icon16.png',
            },
            browser_action: {
                default_icon: {
                    16: 'icon16.png',
                    32: 'icon32.png',
                    64: 'icon64.png',
                },
            },
        };

        if (['chrome', 'opera', 'edge'].includes(browser)) {
            shared_manifest.icons[128] = 'icon128.png';
        }

        if (['chrome', 'firefox'].includes(browser)) {
            shared_manifest.icons[48] = 'icon48.png';
        }

        if (browser === 'edge') {
            shared_manifest.icons[24] = 'icon24.png';
        }

        if (browser === 'firefox') {
            shared_manifest.icons[96] = 'icon96.png';
        }

        if (browser === 'firefox' || mode === 'development') {
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
