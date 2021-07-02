import { i_color } from 'inputs/internal';

type Keys =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 29
    | 29;

export interface ColorPickerState extends Record<Keys, i_color.ColorPickerStateOne> {
    main: i_color.ColorPickerStateOne;
}
