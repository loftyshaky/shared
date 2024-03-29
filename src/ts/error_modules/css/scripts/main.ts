import { d_error } from 'error_modules/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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
                        d_error.State.i().change_state({
                            observable_key: 'is_loaded',
                            state: true,
                        });
                    });
                }
            }
        }
    };
}
