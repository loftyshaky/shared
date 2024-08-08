import { d_error } from 'error_modules/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public load = ({ app_id }: { app_id: string }): void => {
        x.css('font_face', document.head, `font_face_link_${app_id}`);

        const error_root = s<HTMLDivElement>(`.error_${app_id}`);

        if (n(error_root)) {
            const error_shadow: ShadowRoot | undefined = n(error_root.shadowRoot)
                ? error_root.shadowRoot
                : undefined;

            if (error_shadow) {
                const error_css = x.css('error', error_shadow);

                if (n(error_css)) {
                    x.bind(error_css, 'load', (): void => {
                        d_error.State.change_state({
                            observable_key: 'is_loaded',
                            state: true,
                        });
                    });
                }
            }
        }
    };
}

export const Css = Class.get_instance();
