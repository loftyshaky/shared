import { MouseEvent, FocusEvent, KeyboardEvent } from 'react';
import { makeObservable, action, runInAction, observable } from 'mobx';

import { o_color, d_color, i_color } from 'inputs/internal';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            color_help_is_visible: observable,
            mark_color_picker_as_closed: action,
            mark_palette_as_closed: action,
            hide_main_and_palette: action,
            hide_palette_color_pickers: action,
        });
    }

    public visible_input: o_color.Color | undefined;
    public previously_visible_input: o_color.Color | undefined;
    public previously_visible_color_picker_i: i_color.I | undefined;
    private visualization_of_visible_input: HTMLButtonElement | undefined;
    public color_help_is_visible: boolean = true;

    public mark_color_picker_as_closed = ({
        input,
        i,
        is_closed,
    }: {
        input: o_color.Color;
        i: i_color.I;
        is_closed: boolean;
    }): void =>
        err(() => {
            if (n(input.state)) {
                input.state[i as keyof i_color.ColorPickerState].is_closed = is_closed;
            }
        }, 'shr_1019');

    public mark_palette_as_closed = ({
        input,
        is_closed,
    }: {
        input: o_color.Color;
        is_closed: boolean;
    }): void =>
        err(() => {
            input.palette_is_closed = is_closed;
        }, 'shr_1020');

    public change_visibility = (
        {
            input,
            i,
            color_picker_state,
        }: {
            input: o_color.Color;
            i: i_color.I;
            color_picker_state: 'is_initialized' | 'is_visible';
        },
        e: MouseEvent | FocusEvent,
    ): Promise<void> =>
        err_async(async () => {
            await x.delay(30);

            runInAction(() =>
                err(() => {
                    const new_input: o_color.Color = input;
                    const is_palette_color: boolean = input.is_palette_color!({ i });
                    const button: number | false = 'button' in e ? e.button : false;
                    const is_palette: boolean =
                        button === 0 &&
                        input.el_to_show_type!({ i }) === 'color_picker_or_palette' &&
                        color_picker_state === 'is_visible';
                    let palette_is_visible: boolean = false;
                    let color_picker_state_bool: boolean = false;

                    if (n(new_input.state)) {
                        if (is_palette) {
                            palette_is_visible = !new_input.palette_is_visible;
                        } else if (!is_palette) {
                            color_picker_state_bool = is_palette_color
                                ? !new_input.state[i as keyof i_color.ColorPickerState][
                                      color_picker_state
                                  ]
                                : !new_input.state[i as keyof i_color.ColorPickerState][
                                      color_picker_state
                                  ];
                        }

                        if (color_picker_state === 'is_visible') {
                            if (is_palette_color) {
                                if (this.previously_visible_color_picker_i) {
                                    const i_key: i_color.I = this.previously_visible_color_picker_i;
                                    new_input.state[i_key as keyof i_color.ColorPickerState][
                                        color_picker_state
                                    ] = false;
                                }
                            } else if (n(this.visible_input)) {
                                this.hide_main_and_palette({ input: this.visible_input });
                                this.hide_palette_color_pickers({ input: this.visible_input });
                            }

                            if (
                                (button === 2 || i === 'main') &&
                                n(this.previously_visible_input) &&
                                n(this.previously_visible_color_picker_i)
                            ) {
                                d_color.Color.i().restore_old_color();
                            }
                        }

                        if (is_palette) {
                            new_input.palette_is_visible = palette_is_visible;

                            if (palette_is_visible) {
                                this.mark_palette_as_closed({
                                    input: new_input,
                                    is_closed: false,
                                });
                            }
                        } else if (button === 2 || color_picker_state === 'is_initialized') {
                            if (color_picker_state_bool) {
                                new_input.state[i as keyof i_color.ColorPickerState][
                                    color_picker_state
                                ] = color_picker_state_bool;

                                if (color_picker_state === 'is_visible') {
                                    d_color.Color.i().set_previous_color({
                                        input,
                                        i,
                                    });

                                    this.mark_color_picker_as_closed({
                                        input: new_input,
                                        i,
                                        is_closed: false,
                                    });
                                }
                            }

                            if (color_picker_state === 'is_visible' && color_picker_state_bool) {
                                this.previously_visible_input = input;
                                this.previously_visible_color_picker_i = i;
                            }
                        }

                        if (color_picker_state === 'is_visible') {
                            this.visible_input = new_input;
                        }
                    }
                }, 'shr_1021'),
            );
        }, 'shr_1022');

    public hide_main_and_palette = ({ input }: { input: o_color.Color }): void =>
        err(() => {
            const new_input: o_color.Color = input;

            if (n(new_input.state)) {
                new_input.state.main.is_visible = false;
            }

            new_input.palette_is_visible = false;
        }, 'shr_1023');

    public hide_palette_color_pickers = ({ input }: { input: o_color.Color }): void =>
        err(() => {
            const new_input: o_color.Color = input;

            if (n(new_input.state)) {
                d_color.Color.i()
                    .filter_palette_colors({ obj: new_input.state })
                    .forEach((item, i: number): void =>
                        err(() => {
                            if (n(new_input.state) && item !== 'main') {
                                new_input.state[i as keyof i_color.ColorPickerState].is_visible =
                                    false;
                            }
                        }, 'shr_1024'),
                    );
            }
        }, 'shr_1025');

    public hide_all = (e: MouseEvent): void =>
        err(() => {
            const clicked_visualization = x.closest<HTMLButtonElement>(
                e.target as HTMLButtonElement,
                '.visualization, .palette_visualization',
            );
            const clicked_inside_color_picker: boolean = Boolean(
                x.closest<HTMLSpanElement>(e.target as HTMLSpanElement, '.color_picker_w'),
            );
            const clicked_inside_palette: boolean = Boolean(
                x.closest<HTMLDivElement>(e.target as HTMLDivElement, '.palette'),
            );
            const clicked_on_visualization_of_already_opened_input: boolean =
                clicked_visualization === this.visualization_of_visible_input ||
                !n(this.visualization_of_visible_input);

            if (clicked_visualization) {
                this.visualization_of_visible_input = clicked_visualization;
            }

            if (!clicked_inside_color_picker && !clicked_on_visualization_of_already_opened_input) {
                if (n(this.visible_input)) {
                    if (clicked_inside_palette) {
                        this.hide_palette_color_pickers({ input: this.visible_input });
                    } else {
                        this.hide_main_and_palette({ input: this.visible_input });
                        this.hide_palette_color_pickers({ input: this.visible_input });
                    }
                }

                if (
                    n(this.previously_visible_input) &&
                    n(this.previously_visible_color_picker_i) &&
                    (!clicked_visualization || e.button === 0)
                ) {
                    d_color.Color.i().restore_old_color();
                }
            }
        }, 'shr_1026');

    public hide_color_picker_or_palette_on_esc = (e: KeyboardEvent): void =>
        err(() => {
            if (n(this.visible_input) && n(this.visible_input.state) && e.code === 'Escape') {
                const at_least_one_palette_color_picker_opened: boolean = d_color.Color.i()
                    .filter_palette_colors({ obj: this.visible_input.state })
                    .some((item, i: number): boolean =>
                        err(() => {
                            if (
                                this.visible_input &&
                                n(this.visible_input.state) &&
                                item !== 'main'
                            ) {
                                return this.visible_input.state[i as keyof i_color.ColorPickerState]
                                    .is_visible;
                            }

                            return false;
                        }, 'shr_1027'),
                    );

                if (
                    this.visible_input.palette_is_visible &&
                    at_least_one_palette_color_picker_opened
                ) {
                    this.hide_palette_color_pickers({ input: this.visible_input });
                } else {
                    this.hide_main_and_palette({ input: this.visible_input });
                }
            }
        }, 'shr_1028');

    public hide_color_help = ({ input }: { input: o_color.Color }): void =>
        err(() => {
            data.settings.color_help_is_visible = false;

            input.hide_color_help_callback();
        }, 'shr_1029');

    public hide_color_help_tr_end = (): void =>
        err(() => {
            this.color_help_is_visible = false;
        }, 'shr_1210');
}
