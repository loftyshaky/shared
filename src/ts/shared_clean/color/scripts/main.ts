import { i_color } from 'shared_clean/internal';

export class Color {
    private static i0: Color;

    public static i(): Color {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

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
}
