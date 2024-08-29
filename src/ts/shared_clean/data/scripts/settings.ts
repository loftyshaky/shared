import { t } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public apply_unchanged_prefs = ({
        settings,
        additional_unchanged_prefs = {},
    }: {
        settings: any;
        additional_unchanged_prefs?: t.AnyRecord;
    }): t.AnyRecord =>
        err(() => {
            settings.prefs = {
                ...settings.prefs,
                ...{
                    current_section: data.settings.prefs.current_section,
                    color_help_is_visible: data.settings.prefs.color_help_is_visible,
                },
                ...additional_unchanged_prefs,
            };

            return settings;
        }, 'shr_1253');
}

export const Settings = Class.get_instance();
