export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public outer_is_visible: boolean = false;
    public inner_is_none: boolean = false;

    private set_input_type = (
        {
            parent,
            app_id = '',
        }: {
            parent: HTMLElement;
            app_id?: string;
        },
        e: any,
    ): void => err(() => {
        const generate_class = ({
            input_type,
            app_id_2 = '',
        }: {
            input_type: string;
            app_id_2?: string;
        }): string => err(() => (
            app_id === ''
                ? input_type
                : `${input_type}_${app_id_2}`
        ),
        1069);

        const mouse_cls: string = generate_class({
            input_type: 'mouse',
            app_id_2: app_id,
        });
        const keyboard_cls: string = generate_class({
            input_type: 'keyboard',
            app_id_2: app_id,
        });
        const input_type_2: string = e.type === 'mousedown'
            ? mouse_cls
            : keyboard_cls;
        const hit_esc = n(e)
                        && n(e.code)
                        && e.code === 'Escape';
        if (
            input_type_2 === mouse_cls
            || !hit_esc
        ) {
            if (input_type_2 === mouse_cls) {
                x.remove_cls(
                    parent,
                    keyboard_cls,
                );
                x.add_cls(
                    parent,
                    input_type_2,
                );
            } else if (input_type_2 === keyboard_cls) {
                x.remove_cls(
                    parent,
                    mouse_cls,
                );
                x.add_cls(
                    parent,
                    input_type_2,
                );
            }
        }
    },
    's1064');

    public bind_set_input_type_f = ({
        parent,
        app_id = '',
    }: {
        parent?: HTMLElement;
        app_id?: string;
    } = {}): void => err(() => {
        const parent_final = n(parent)
            ? parent
            : document.body;

        const set_input_type = (e: any): void => err(() => {
            this.set_input_type(
                {
                    parent: parent_final,
                    app_id,
                },
                e,
            );
        },
        's1066');

        parent_final.addEventListener(
            'mousedown',
            set_input_type,
        );
        parent_final.addEventListener(
            'keydown',
            set_input_type,
        );
    },
    's1065');
}
