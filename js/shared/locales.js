const path = require('path');

const fs = require('fs-extra');

const { is_ext } = require('./apps');

class Locales {
    constructor({ app_root }) {
        this.app_root = app_root;
    }

    merge = async () => {
        const app_locales_path = path.join(this.app_root, 'src', '_locales');
        const shared_locales_path = path.join(
            this.app_root,
            'node_modules',
            '@loftyshaky',
            `shared${is_ext({ app_root: this.app_root }) ? '' : '-app'}`,
            '_locales',
        );
        const locales = fs.readdirSync(app_locales_path);

        locales.forEach((locale) => {
            const shared_messages_path = path.join(shared_locales_path, locale, 'messages.json');

            const app_messages = fs.readJSONSync(
                path.join(app_locales_path, locale, 'messages.json'),
            );

            let shared_messages = {};

            if (fs.existsSync(shared_messages_path)) {
                shared_messages = fs.readJSONSync(
                    path.join(shared_locales_path, locale, 'messages.json'),
                );
            }

            const merged_messages = {
                ...shared_messages,
                ...app_messages,
            };
            const locale_path = path.join(this.app_root, 'dist', '_locales', locale);
            const dest_messages = path.join(locale_path, 'messages.json');

            fs.ensureDirSync(locale_path);
            fs.writeJsonSync(dest_messages, merged_messages);
        });
    };
}

module.exports = { Locales };
