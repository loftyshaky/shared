import {
    makeObservable,
    action,
} from 'mobx';

import {
    o_color,
    d_color,
    i_color,
} from 'inputs/internal';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                change_visibility: action,
                hide_main_and_palette: action,
                hide_palette_color_pickers: action,
            },
        );
    }

    public visible_input: o_color.Color | undefined;
    public previously_visible_input: o_color.Color | undefined;
    public previously_visible_color_picker_i: i_color.I | undefined;
    private visualization_of_visible_input: HTMLButtonElement | undefined;

    public change_visibility = ({
        input,
        i,
        color_picker_state,
    }: {
        input: o_color.Color;
        i: i_color.I;
        color_picker_state: 'is_initialized' | 'is_visible',
    }, e: any): void => err(() => {
        const new_input: o_color.Color = input;
        const is_palette_color: boolean = input.is_palette_color!({ i });
        const is_palette: boolean = e.button === 0
            && input.el_to_show_type!({ i }) === 'color_picker_or_palette'
            && color_picker_state === 'is_visible';
        let palette_is_visible: boolean = false;
        let color_picker_state_bool: boolean = false;

        if (is_palette) {
            palette_is_visible = !new_input.palette_is_visible;
        } else if (!is_palette) {
            color_picker_state_bool = is_palette_color
                ? !new_input.state[i][color_picker_state]
                : !new_input.state[i][color_picker_state];
        }

        if (color_picker_state === 'is_visible') {
            if (is_palette_color) {
                if (this.previously_visible_color_picker_i) {
                    new_input.state[this.previously_visible_color_picker_i][color_picker_state] = (
                        false
                    );
                }
            } else if (n(this.visible_input)) {
                this.hide_main_and_palette({ input: this.visible_input });
                this.hide_palette_color_pickers({ input: this.visible_input });
            }

            if (
                (
                    e.button === 2
                    || i === 'main'
                )
                && n(this.previously_visible_input)
                && n(this.previously_visible_color_picker_i)
            ) {
                d_color.Color.i().restore_old_color();
            }
        }

        if (is_palette) {
            new_input.palette_is_visible = palette_is_visible;
        } else if (
            e.button === 2
            || color_picker_state === 'is_initialized'
        ) {
            if (color_picker_state_bool) {
                new_input.state[i][color_picker_state] = color_picker_state_bool;

                if (color_picker_state === 'is_visible') {
                    d_color.Color.i().set_previous_color({
                        input,
                        i,
                    });
                }
            }

            if (
                color_picker_state === 'is_visible'
                && color_picker_state_bool
            ) {
                this.previously_visible_input = input;
                this.previously_visible_color_picker_i = i;
            }
        }

        if (color_picker_state === 'is_visible') {
            this.visible_input = new_input;
        }
    },
    's1033');

    public hide_main_and_palette = ({ input }: { input: o_color.Color }): void => err(() => {
        const new_input: o_color.Color = input;

        new_input.state.main.is_visible = false;
        new_input.palette_is_visible = false;
    },
    's1034');

    public hide_palette_color_pickers = ({ input }: { input: o_color.Color }): void => err(() => {
        const new_input: o_color.Color = input;

        d_color.Color.i().filter_palette_colors(
            { obj: new_input.state },
        ).forEach((item, i: number): void => {
            if (item !== 'main') {
                new_input.state[i].is_visible = false;
            }
        });
    },
    's1035');

    public hide_all = (e: any): void => err(() => {
        const clicked_visualization = x.closest<HTMLButtonElement>(
            e.target,
            '.visualization, .palette_visualization',
        );
        const clicked_inside_color_picker: boolean = Boolean(
            x.closest<HTMLSpanElement>(
                e.target,
                '.color_picker_w',
            ),
        );
        const clicked_inside_palette: boolean = Boolean(
            x.closest<HTMLDivElement>(
                e.target,
                '.palette',
            ),
        );
        const clicked_on_visualization_of_already_opened_input: boolean = (
            clicked_visualization === this.visualization_of_visible_input
            || !n(this.visualization_of_visible_input)
        );

        if (clicked_visualization) {
            this.visualization_of_visible_input = clicked_visualization;
        }

        if (
            !clicked_inside_color_picker
            && !clicked_on_visualization_of_already_opened_input
        ) {
            if (n(this.visible_input)) {
                if (clicked_inside_palette) {
                    this.hide_palette_color_pickers({ input: this.visible_input });
                } else {
                    this.hide_main_and_palette({ input: this.visible_input });
                    this.hide_palette_color_pickers({ input: this.visible_input });
                }
            }

            if (
                n(this.previously_visible_input)
                && n(this.previously_visible_color_picker_i)
                && (
                    !clicked_visualization
                    || e.button === 0
                )
            ) {
                d_color.Color.i().restore_old_color();
            }
        }
    },
    's1036');

    public hide_color_help = ({ input }: { input: o_color.Color; }): void => err(() => {
        data.settings.show_color_help = false;

        input.hide_color_help_callback();
    },
    's1047');
}
