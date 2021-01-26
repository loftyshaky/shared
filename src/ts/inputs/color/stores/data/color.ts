import _ from 'lodash';
import {
    makeObservable,
    action,
} from 'mobx';

import {
    o_color,
    d_color,
    i_color,
} from 'inputs/internal';

export class Color {
    private static i0: Color;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public constructor() {
        makeObservable(
            this,
            {
                set: action,
                select_palette_color: action,
            },
        );
    }

    public default_colors: any = {
        0: 'rgb(255 255 255)',
        1: 'rgb(0 0 0)',
        2: 'rgb(255 0 0)',
        3: 'rgb(183 28 28)',
        4: 'rgb(244 67 54)',
        5: 'rgb(245 0 87)',
        6: 'rgb(136 14 79)',
        7: 'rgb(240 98 146)',
        8: 'rgb(170 0 255)',
        9: 'rgb(74 20 140)',
        10: 'rgb(156 39 176)',
        11: 'rgb(98 0 234)',
        12: 'rgb(103 58 183)',
        13: 'rgb(48 79 254)',
        14: 'rgb(63 81 181)',
        15: 'rgb(0 176 255)',
        16: 'rgb(24 255 255)',
        17: 'rgb(29 233 182)',
        18: 'rgb(0 150 136)',
        19: 'rgb(0 200 83)',
        20: 'rgb(27 94 32)',
        21: 'rgb(100 221 23)',
        22: 'rgb(174 234 0)',
        23: 'rgb(255 214 0)',
        24: 'rgb(255 235 59)',
        25: 'rgb(255 111 0)',
        26: 'rgb(255 213 79)',
        27: 'rgb(255 152 0)',
        28: 'rgb(221 44 0)',
        29: 'rgb(191 54 12)',
    };

    public palette_color_amount: number = Object.keys(this.default_colors).length;
    public previous_color: i_color.Color = '';

    public access = (
        {
            input,
            i,
        }: {
            input: o_color.Color;
            i: i_color.I;
        },
    ): string => err(() => {
        if (i === 'main') {
            const val: i_color.Color = data.settings[input.name];

            if (this.val_is_palette_color({ input })) {
                return data.settings.colors[val];
            }

            return val;
        }

        return data.settings.colors[i];
    },
    's1045');

    public set = (
        {
            input,
            i,
            color,
        }: {
            input: o_color.Color;
            i: i_color.I;
            color: i_color.Color
        },
    ): void => err(() => {
        if (i === 'main') {
            data.settings[input.name] = color;
        } else {
            data.settings.colors[i] = color;
        }
    },
    's1037');

    public save = (
        {
            input,
            i,
        }: {
            input: o_color.Color;
            i: i_color.I;
        },
    ): void => err(() => {
        this.set_previous_color({
            input,
            i,
        });

        if (i === 'main') {
            input.save_callback({ input });

            d_color.Visibility.i.hide_main_and_palette({ input });
        } else {
            d_color.Visibility.i.hide_palette_color_pickers({ input });
        }
    },
    's1038');

    public restore_old_color = (): void => err(() => {
        const color: string = typeof this.previous_color === 'number'
            ? data.settings.colors[this.previous_color]
            : this.previous_color;

        if (
            d_color.Visibility.i.previously_visible_input
            && d_color.Visibility.i.previously_visible_color_picker_i
        ) {
            this.set({
                input: d_color.Visibility.i.previously_visible_input,
                i: d_color.Visibility.i.previously_visible_color_picker_i,
                color,
            });
        }
    },
    's1039');

    public convert_pickr_color_to_rgb_string = (
        { pickr_color }: { pickr_color: any },
    ): string => err(() => {
        const { round } = Math;
        const rgba = pickr_color.toRGBA();

        return `rgb(${round(rgba[0])} ${round(rgba[1])} ${round(rgba[2])})`;
    },
    's1040');

    public filter_palette_colors = (
        { obj }: { obj: any },
    ): string[] => err(() => (
        Object.keys(obj).filter(
            (key: string): boolean => (
                !_.isNaN(+key)
            ),
        )
    ),
    's1044');

    public select_palette_color = (
        {
            input,
            i,
        }: {
            input: o_color.Color;
            i: i_color.I;
        },
    ): void => err(() => {
        if (input.is_palette_color!({ i })) {
            data.settings[input.name] = i;

            this.previous_color = i;

            d_color.Visibility.i.previously_visible_input = input;
            d_color.Visibility.i.previously_visible_color_picker_i = i;

            input.select_palette_color_callback({ input });
        }
    },
    's1046');

    public val_is_palette_color = ({ input }: {input: o_color.Color }): boolean => err(() => {
        const val: i_color.Color = data.settings[input.name];
        const val_is_palette_color: boolean = typeof val === 'number';

        return val_is_palette_color;
    },
    's1048');

    public set_previous_color = (
        {
            input,
            i,
        }:
        {
            input: o_color.Color;
            i: i_color.I
        },
    ): void => err(() => {
        this.previous_color = d_color.Color.i.access({
            input,
            i,
        });
    },
    's1049');
}
