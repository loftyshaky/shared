import { makeObservable, observable } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared/internal';
import { o_inputs, d_color, i_color } from 'inputs/internal';

const color_picker_state: i_color.ColorPickerStateOne = {
    is_initialized: false,
    is_visible: false,
    is_closed: true,
};

export class Color extends o_inputs.InputBase {
    public type?: 'color' = 'color';
    public include_visualization?: boolean = true;
    public include_palette_label?: boolean = false;
    public palette_is_visible?: boolean = false;
    public palette_is_closed?: boolean = true;
    public palette_width?: string = '0';
    public palette_height?: string = '0';
    public color_picker_width?: string = '0';
    public color_picker_height?: string = '0';
    public include_remove_color_btn?: boolean = true;
    public include_ok_btn?: boolean = false;
    public state?: i_color.ColorPickerState = {
        main: color_picker_state,
        ...Array(d_color.Color.i().palette_color_amount)
            .fill(color_picker_state)
            .reduce(
                (
                    accumulator: i_color.ColorPickerState,
                    val: i_color.ColorPickerStateOne,
                    i: number,
                ) => {
                    accumulator[i as keyof i_color.ColorPickerState] = val;

                    return accumulator;
                },
                {},
            ),
    };

    public select_palette_color_callback: t.CallbackVariadicVoid;
    public remove_color_callback: t.CallbackVariadicVoid;
    public restore_default_palette_callback: t.CallbackVariadicVoid;
    public hide_color_help_callback: t.CallbackVoid;

    public constructor(obj: Color) {
        super(obj);

        makeObservable(this, {
            palette_is_visible: observable,
            palette_is_closed: observable,
            palette_width: observable,
            palette_height: observable,
            color_picker_width: observable,
            color_picker_height: observable,
            state: observable,
        });

        Object.assign(this, obj);

        this.select_palette_color_callback = obj.select_palette_color_callback;
        this.remove_color_callback = obj.remove_color_callback;
        this.restore_default_palette_callback = obj.restore_default_palette_callback;
        this.hide_color_help_callback = obj.hide_color_help_callback;
    }

    is_palette_color? = ({ i }: { i: i_color.I }): boolean =>
        err(() => typeof i === 'number', 'shr_1030');

    visualization_cls? = ({ i }: { i: i_color.I }): string =>
        err(() => (i === 'main' ? 'visualization' : ''), 'shr_1031');

    palette_visualization_cls? = ({ i }: { i: i_color.I }): string =>
        err(() => (i === 'main' ? '' : 'palette_visualization'), 'shr_1032');

    inset_border_cls? = ({ i }: { i: i_color.I }): string =>
        err(() => (i === 'main' ? '' : 'inset_border'), 'shr_1033');

    el_to_show_type? = ({ i }: { i: i_color.I }): string =>
        err(() => (i === 'main' ? 'color_picker_or_palette' : 'color_picker'), 'shr_1034');

    color_picker_is_visible? = computedFn(function (this: Color, { i }: { i: i_color.I }): boolean {
        return n(this.state) && this.state[i as keyof i_color.ColorPickerState].is_visible;
    });

    palette_w_is_visible? = computedFn(function (this: Color): boolean {
        return this.include_visualization ? (this.palette_is_visible as boolean) : true;
    });

    visualization_outline_opened? = computedFn(function (
        this: Color,
        { i }: { i: i_color.I },
    ): string {
        return (i === 'main' && this.palette_is_visible) ||
            (n(this.state) && this.state[i as keyof i_color.ColorPickerState].is_visible)
            ? 'opened'
            : '';
    });

    visualization_outline_selected? = computedFn(function (
        this: Color,
        { i }: { i: i_color.I },
    ): string {
        if (this.is_palette_color!({ i }) && i === data.settings[this.name]) {
            return 'selected';
        }

        return '';
    });

    palette_visualization_outline_selected? = computedFn(function (
        this: Color,
        { i }: { i: i_color.I },
    ): string {
        return i === data.settings.selected_palette_color ? 'selected' : '';
    });

    color_picker_is_closed_visibility_cls? = computedFn(function (
        this: Color,
        { i }: { i: i_color.I },
    ): string {
        return n(this.state) && this.state[i as keyof i_color.ColorPickerState].is_closed
            ? 'none'
            : '';
    });

    palette_is_closed_visibility_cls? = computedFn(function (this: Color): string {
        return this.palette_is_closed ? 'none' : '';
    });

    color_help_visibility_cls? = computedFn(function (this: Color): string {
        return d_color.Visibility.i().color_help_is_visible ? '' : 'none';
    });
}
