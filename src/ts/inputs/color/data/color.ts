import { MouseEvent } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import isNaN from 'lodash/isNaN';
import { makeObservable, action } from 'mobx';

import { t, s_color, i_color as i_color_shared_clean } from 'shared_clean/internal';
import { o_color, d_color, i_color } from 'inputs/internal';

export class Color {
    private static i0: Color;

    public static i(): Color {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            set: action,
            select_palette_color: action,
            restore_default_palette: action,
        });
    }

    public palette_color_amount: number = Object.keys(s_color.Color.i().default_colors).length;
    public previous_color: i_color_shared_clean.Color = '';

    public access = ({ input, i }: { input: o_color.Color; i: i_color.I }): string =>
        err(() => {
            if (i === 'main') {
                const val: i_color_shared_clean.Color = n(input.val_accessor)
                    ? get(data, input.val_accessor)
                    : data.settings[input.name];

                if (this.val_is_palette_color({ input })) {
                    return data.settings.colors[val];
                }

                return val;
            }

            return data.settings.colors[i];
        }, 'shr_1006');

    public access_from_val = ({ val }: { val: i_color_shared_clean.Color }): string =>
        err(() => (typeof val === 'number' ? data.settings.colors[val] : val), 'shr_1007');

    public set = ({
        input,
        i,
        color,
    }: {
        input: o_color.Color;
        i: i_color.I;
        color: i_color_shared_clean.Color;
    }): void =>
        err(() => {
            if (i === 'main') {
                if (n(input.val_accessor)) {
                    set(data, input.val_accessor, color);
                } else {
                    data.settings[input.name] = color;
                }
            } else {
                data.settings.colors[i] = color;
            }
        }, 'shr_1008');

    public save = ({
        input,
        i,
        callback,
    }: {
        input: o_color.Color;
        i: i_color.I;
        callback: t.CallbackVariadicVoid;
    }): void =>
        err(() => {
            this.set_previous_color({
                input,
                i,
            });

            if (i === 'main') {
                d_color.Visibility.i().hide_main_and_palette({ input });
            } else {
                d_color.Visibility.i().hide_palette_color_pickers({ input });
            }

            callback({
                input,
                i,
            });
        }, 'shr_1009');

    public restore_old_color = (): void =>
        err(() => {
            const inst = d_color.Visibility.i();

            if (n(inst.previously_visible_input) && n(inst.previously_visible_color_picker_i)) {
                const color: i_color_shared_clean.Color =
                    inst.previously_visible_color_picker_i !== 'main' &&
                    typeof this.previous_color === 'number'
                        ? data.settings.colors[this.previous_color]
                        : this.previous_color;

                this.set({
                    input: inst.previously_visible_input,
                    i: inst.previously_visible_color_picker_i,
                    color,
                });
            } else if (this.previous_color === '' && n(inst.visible_input)) {
                this.set({
                    input: inst.visible_input,
                    i: 'main',
                    color: this.previous_color,
                });
            }
        }, 'shr_1010');

    public convert_pickr_color_to_rgb_string = ({
        pickr_color,
    }: {
        pickr_color: t.AnyRecord;
    }): string =>
        err(() => {
            const { round } = Math;
            const rgba = pickr_color.toRGBA();

            return `rgb(${round(rgba[0])} ${round(rgba[1])} ${round(rgba[2])})`;
        }, 'shr_1011');

    public filter_palette_colors = ({ obj }: { obj: i_color.ColorPickerState }): string[] =>
        err(() => Object.keys(obj).filter((key: string): boolean => !isNaN(+key)), 'shr_1012');

    public select_palette_color = (
        {
            input,
            i,
        }: {
            input: o_color.Color;
            i: i_color.I;
        },
        e: MouseEvent,
    ): void =>
        err(() => {
            const called_by_enter_key: boolean = e.detail === 0;

            if (!called_by_enter_key && input.is_palette_color!({ i })) {
                if (n(input.val_accessor)) {
                    set(data, input.val_accessor, i);
                } else {
                    data.settings[input.name] = i;
                }

                this.previous_color = i;

                d_color.Visibility.i().previously_visible_input = input;
                d_color.Visibility.i().previously_visible_color_picker_i = i;

                input.select_palette_color_callback({
                    input,
                    i,
                });
            }
        }, 'shr_1013');

    public val_is_palette_color = ({ input }: { input: o_color.Color }): boolean =>
        err(() => {
            const val: i_color_shared_clean.Color = n(input.val_accessor)
                ? get(data, input.val_accessor)
                : data.settings[input.name];
            const val_is_palette_color: boolean = typeof val === 'number';

            return val_is_palette_color;
        }, 'shr_1014');

    public set_previous_color = ({ input, i }: { input: o_color.Color; i: i_color.I }): void =>
        err(() => {
            const color: i_color_shared_clean.Color = n(input.val_accessor)
                ? get(data, input.val_accessor)
                : data.settings[input.name];

            this.previous_color =
                i === 'main'
                    ? color
                    : d_color.Color.i().access({
                          input,
                          i,
                      });
        }, 'shr_1015');

    public remove_color = ({ input }: { input: o_color.Color }): void =>
        err(() => {
            d_color.Color.i().set({
                input,
                i: 'main',
                color: '',
            });

            this.reset_previous_vars();
            input.remove_color_callback({ input });
        }, 'shr_1016');

    public restore_default_palette = ({
        input,
        default_colors,
    }: {
        input: o_color.Color;
        default_colors?: i_color_shared_clean.Color[];
    }): void =>
        err(() => {
            // eslint-disable-next-line no-alert
            const confirmed_restore: boolean = globalThis.confirm(
                ext.msg('restore_default_palette_confirm'),
            );

            if (confirmed_restore) {
                data.settings.colors = n(default_colors)
                    ? default_colors
                    : s_color.Color.i().default_colors;

                this.reset_previous_vars();
                input.restore_default_palette_callback({ default_colors: data.settings.colors });
            }
        }, 'shr_1017');

    public reset_previous_vars = (): void =>
        err(() => {
            d_color.Color.i().previous_color = '';
            d_color.Visibility.i().previously_visible_input = undefined;
            d_color.Visibility.i().previously_visible_color_picker_i = undefined;
        }, 'shr_1018');
}
