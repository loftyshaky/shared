export class Css {
    private static i0: Css;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public load = ({ app_id }: {app_id: string}): void => {
        x.css(
            'font_face',
            document.head,
            `font_face_link_${app_id}`,
        );

        const error_root = s<HTMLDivElement>(`.error_${app_id}`);

        if (n(error_root)) {
            const error_shadow: ShadowRoot | undefined = n(error_root.shadowRoot)
                ? error_root.shadowRoot
                : undefined;

            if (error_shadow) {
                x.css(
                    'normalize',
                    error_shadow,
                );

                x.css(
                    'error',
                    error_shadow,
                );
            }
        }
    };
}
