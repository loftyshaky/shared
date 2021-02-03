import {
    makeObservable,
    observable,
} from 'mobx';

import { computedFn } from 'mobx-utils';

import { t } from 'shared/internal';
import {
    o_inputs,
    d_color,
    i_color,
} from 'inputs/internal';

const color_picker_state: i_color.ColorPickerState = {
    is_initialized: false,
    is_visible: false,
};

export class Color extends o_inputs.InputBase {
    public type?: 'color' = 'color';
    public include_visualization?: boolean= true;
    public include_palette_label?: boolean = false;
    public palette_is_visible?: boolean = false;
    public palette_width?: number = 0;
    public palette_height?: number = 0;
    public color_picker_width?: number = 0;
    public color_picker_height?: number = 0;
    public show_color_input_help?: boolean = false;
    public state?: any = {
        main: color_picker_state,
        ...Array(d_color.Color.i().palette_color_amount).fill(color_picker_state),
    }

    public select_palette_color_callback: t.CallbackVariadicVoid;
    public remove_color_callback: t.CallbackVariadicVoid;
    public restore_default_palette_callback: t.CallbackVariadicVoid;
    public hide_color_help_callback: t.CallbackVoid;

    public constructor(obj: Color) {
        super(obj);

        makeObservable(
            this,
            {
                palette_is_visible: observable,
                palette_width: observable,
                palette_height: observable,
                color_picker_width: observable,
                color_picker_height: observable,
                show_color_input_help: observable,
                state: observable,
            },
        );

        Object.assign(
            this,
            obj,
        );

        this.select_palette_color_callback = obj.select_palette_color_callback;
        this.remove_color_callback = obj.remove_color_callback;
        this.restore_default_palette_callback = obj.restore_default_palette_callback;
        this.hide_color_help_callback = obj.hide_color_help_callback;
    }

    is_palette_color? = ({ i }: { i: i_color.I; }): boolean => (
        typeof i === 'number'
    )

    visualization_cls? = ({ i }: { i: i_color.I; }): string => (
        i === 'main'
            ? 'visualization'
            : ''
    )

    palette_visualization_cls? = ({ i }: { i: i_color.I; }): string => (
        i === 'main'
            ? ''
            : 'palette_visualization'
    )

    inset_border_cls? = ({ i }: { i: i_color.I; }): string => (
        i === 'main'
            ? ''
            : 'inset_border'
    )

    el_to_show_type? = ({ i }: { i: i_color.I; }): string => (
        i === 'main'
            ? 'color_picker_or_palette'
            : 'color_picker'
    )

    palette_w_is_visible? = computedFn(
        function (this: Color): boolean {
            return (
                this.include_visualization
                    ? this.palette_is_visible as boolean
                    : true
            );
        },
    );

    visualization_outline_opened? = computedFn(
        function (
            this: Color,
            { i }: { i: i_color.I; },
        ): string {
            return (
                (
                    i === 'main'
                    && this.palette_is_visible
                ) || this.state[i].is_visible
                    ? 'opened'
                    : ''
            );
        },
    );

    visualization_selected_opened? = computedFn(
        function (
            this: Color,
            { i }: { i: i_color.I; },
        ): string {
            if (
                this.is_palette_color!({ i })
                && i === data.settings[this.name]
            ) {
                return 'selected';
            }

            return '';
        },
    );

    palette_visualization_outline_selected? = computedFn(
        function (
            this: Color,
            { i }: { i: i_color.I; },
        ): string {
            return (
                i === data.settings.selected_palette_color
                    ? 'selected'
                    : ''
            );
        },
    );
}
