const path = require('path');

const fs = require('fs-extra');

const { is_ext } = require('./apps');

class Locales {
    constructor({ app_root, exclude_shared_locales = [] }) {
        // exclude_shared_locales: if an extension has an uncomplete messages.json for a locale (the extension itself, not shared), this setting prevents a messages.json form shared mixing with it. Note: If an extension (the extension itself, not shared) doesn't have a messages.json for a locale, you don't need to use this settings because this script is looking for locale forlders (const locales = fs.readdirSync(app_locales_path);) in an extension (the extension itself, not shared) and then loping through them based on locales found (locales.forEach((locale) => {)
        this.app_root = app_root;
        this.exclude_shared_locales = exclude_shared_locales;
    }

    merge = async ({ env }) => {
        const app_locales_path = path.join(
            this.app_root,
            env === 'adonis_app' ? 'resources' : 'src',
            '_locales',
        );
        const shared_locales_path = path.join(
            this.app_root,
            'node_modules',
            '@loftyshaky',
            `shared${is_ext() ? '' : '-app'}`,
            '_locales',
        );
        const locales = fs.readdirSync(app_locales_path);

        locales.forEach((locale) => {
            const locale_is_excluded = this.exclude_shared_locales.includes(locale);

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

            const merged_messages = locale_is_excluded
                ? app_messages
                : {
                      ...shared_messages,
                      ...app_messages,
                  };
            const locale_path = path.join(
                this.app_root,
                env === 'adonis_app' ? path.join('public', 'assets') : 'dist',
                '_locales',
                locale,
            );
            const dest_messages = path.join(locale_path, 'messages.json');

            fs.ensureDirSync(locale_path);
            fs.writeJsonSync(dest_messages, merged_messages);
        });
    };
}

module.exports = { Locales };
