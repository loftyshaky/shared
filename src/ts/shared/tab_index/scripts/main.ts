import { o_color, d_color, i_color } from 'inputs/internal';

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
    ): void =>
        err(() => {
            const generate_class = ({
                input_type,
                app_id_2 = '',
            }: {
                input_type: string;
                app_id_2?: string;
            }): string =>
                err(() => (app_id === '' ? input_type : `${input_type}_${app_id_2}`), 'shr_1068');

            const mouse_cls: string = generate_class({
                input_type: 'mouse',
                app_id_2: app_id,
            });
            const keyboard_cls: string = generate_class({
                input_type: 'keyboard',
                app_id_2: app_id,
            });
            const input_type_2: string = e.type === 'mousedown' ? mouse_cls : keyboard_cls;
            const hit_esc = n(e) && n(e.code) && e.code === 'Escape';
            if (input_type_2 === mouse_cls || !hit_esc) {
                if (input_type_2 === mouse_cls) {
                    x.remove_cls(parent, keyboard_cls);
                    x.add_cls(parent, input_type_2);
                } else if (input_type_2 === keyboard_cls) {
                    x.remove_cls(parent, mouse_cls);
                    x.add_cls(parent, input_type_2);
                }
            }
        }, 'shr_1069');

    public bind_set_input_type_f = ({
        parent,
        app_id = '',
    }: {
        parent?: HTMLElement;
        app_id?: string;
    } = {}): void =>
        err(() => {
            const parent_final = n(parent) ? parent : document.body;

            const set_input_type = (e: any): void =>
                err(() => {
                    this.set_input_type(
                        {
                            parent: parent_final,
                            app_id,
                        },
                        e,
                    );
                }, 'shr_1070');

            x.bind(parent_final, 'mousedown', set_input_type);
            x.bind(parent_final, 'keydown', set_input_type);
        }, 'shr_1071');

    public simulate_click_on_enter = (e: any): void =>
        err(() => {
            if (e.code === 'Enter') {
                e.target.click();
            }
        }, 'shr_1072');

    public simulate_color_visualization_click_on_enter = (
        {
            input,
            i,
        }: {
            input: o_color.Color;
            i: i_color.I;
        },
        e: any,
    ): void =>
        err(() => {
            const e_2: any = { button: 0 };
            const e_3: any = { detail: 1 };

            const call_change_visibility = (): void =>
                err(() => {
                    d_color.Visibility.i().change_visibility(
                        {
                            input,
                            i,
                            color_picker_state: 'is_visible',
                        },
                        e_2,
                    );
                }, 'shr_1073');

            if (e.code === 'Enter') {
                if (e.ctrlKey || e.shiftKey || e.altKey) {
                    e_2.button = 2;
                } else {
                    e_2.button = 0;
                }

                if (
                    x.matches(e.target, '.palette_visualization') &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.altKey
                ) {
                    d_color.Color.i().select_palette_color(
                        {
                            input,
                            i,
                        },
                        e_3,
                    );

                    if (input.state[i].is_visible) {
                        call_change_visibility();
                    }
                } else {
                    call_change_visibility();
                }
            }
        }, 'shr_1074');
}
