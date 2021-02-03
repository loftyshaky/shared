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

    public static i(): Color {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(
            this,
            {
                set: action,
                select_palette_color: action,
            },
        );
    }

    public default_colors: i_color.Color[] = [
        'rgb(255 255 255)',
        'rgb(0 0 0)',
        'rgb(255 0 0)',
        'rgb(183 28 28)',
        'rgb(244 67 54)',
        'rgb(245 0 87)',
        'rgb(136 14 79)',
        'rgb(240 98 146)',
        'rgb(170 0 255)',
        'rgb(74 20 140)',
        'rgb(156 39 176)',
        'rgb(98 0 234)',
        'rgb(103 58 183)',
        'rgb(48 79 254)',
        'rgb(63 81 181)',
        'rgb(0 176 255)',
        'rgb(24 255 255)',
        'rgb(29 233 182)',
        'rgb(0 150 136)',
        'rgb(0 200 83)',
        'rgb(27 94 32)',
        'rgb(100 221 23)',
        'rgb(174 234 0)',
        'rgb(255 214 0)',
        'rgb(255 235 59)',
        'rgb(255 111 0)',
        'rgb(255 213 79)',
        'rgb(255 152 0)',
        'rgb(221 44 0)',
        'rgb(191 54 12)',
    ];

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

    public access_from_val = ({ val }: { val: i_color.Color; }): string => err(() => (
        typeof val === 'number'
            ? data.settings.colors[val]
            : val
    ),
    's1050');

    public set = (
        {
            input,
            i,
            color,
        }: {
            input: o_color.Color;
            i: i_color.I;
            color: i_color.Color;
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
            d_color.Visibility.i().hide_main_and_palette({ input });
        } else {
            d_color.Visibility.i().hide_palette_color_pickers({ input });
        }

        input.event_callback({
            input,
            i,
        });
    },
    's1038');

    public restore_old_color = (): void => err(() => {
        const inst = d_color.Visibility.i();

        if (n(inst.previously_visible_input)
            && n(inst.previously_visible_color_picker_i)
        ) {
            const color: i_color.Color = inst.previously_visible_color_picker_i !== 'main'
                                         && typeof this.previous_color === 'number'
                ? data.settings.colors[this.previous_color]
                : this.previous_color;

            this.set({
                input: inst.previously_visible_input,
                i: inst.previously_visible_color_picker_i,
                color,
            });
        } else if (
            this.previous_color === ''
            && n(inst.visible_input)
        ) {
            this.set({
                input: inst.visible_input,
                i: 'main',
                color: this.previous_color,
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

            d_color.Visibility.i().previously_visible_input = input;
            d_color.Visibility.i().previously_visible_color_picker_i = i;

            input.select_palette_color_callback({
                input,
                i,
            });
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
        this.previous_color = i === 'main'
            ? data.settings[input.name]
            : d_color.Color.i().access({
                input,
                i,
            });
    },
    's1049');

    public restore_default_color = ({ input }: { input: o_color.Color; }): void => err(() => {
        if (input.default_val !== undefined) {
            d_color.Color.i().set({
                input,
                i: 'main',
                color: input.default_val,
            });

            d_color.Color.i().previous_color = '';
            d_color.Visibility.i().previously_visible_input = undefined;
            d_color.Visibility.i().previously_visible_color_picker_i = (
                undefined
            );

            input.restore_default_color_callback({ input });
        }
    },
    's1051');
}
