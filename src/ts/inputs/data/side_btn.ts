import { computedFn } from 'mobx-utils';

import { o_inputs, i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    is_enabled_cls? = computedFn(function ({
        name,
        input,
    }: {
        name: string;
        input: i_inputs.Input;
    }): string {
        if (n(input.side_btns)) {
            const side_btn_2: i_inputs.SideBtn | undefined = input.side_btns.find(
                (side_btn: i_inputs.SideBtn): boolean =>
                    err(() => side_btn.name === name, 'cnt_4637'),
            );

            if (n(side_btn_2) && n(side_btn_2.is_enabled_cond)) {
                return side_btn_2.is_enabled_cond!({ input }) ? '' : 'is_disabled';
            }
        }

        return '';
    });

    public set_side_btns_offset_bottom_val = (
        {
            input,
            el,
        }: {
            input: i_inputs.Input;
            el?: HTMLElement | null;
        },
        e?: TransitionEvent | undefined,
    ): void =>
        err(() => {
            if (n(el) || n(e)) {
                const get_el_css_vals = ({
                    el_classname,
                }: {
                    el_classname: string;
                }): { height: number; margin_top: number } =>
                    err(() => {
                        const parent_el = sb<HTMLElement>(input_item, `.${el_classname}`);
                        const is_visible: boolean | undefined =
                            el_classname === 'input_error'
                                ? input.is_in_warn_state
                                : input.help_is_visible;

                        const height = is_visible
                            ? rn(x.get_numeric_css_val(parent_el, 'height'))
                            : 0;
                        const margin_top =
                            height === 0 ? 0 : rn(x.get_numeric_css_val(parent_el, 'margin-top'));

                        return {
                            height,
                            margin_top,
                        };
                    }, 'shr_1311');

                const target = n(e) ? e.target : el;
                const input_item: HTMLElement = x.closest(n(el) ? el : target, '.input_item');
                const input_error_css_vals = get_el_css_vals({ el_classname: 'input_error' });
                const help_css_vals = get_el_css_vals({ el_classname: 'help' });

                input.side_btns_offset_bottom = `${input_error_css_vals.height + help_css_vals.height + input_error_css_vals.margin_top + help_css_vals.margin_top}px`;
            }
        }, 'shr_1310');

    public set_side_btns_offset_bottom_val_help_tr_end = (
        {
            section_or_input,
        }: {
            section_or_input: i_inputs.Input | o_inputs.Section;
        },
        e?: TransitionEvent | undefined,
    ): void =>
        err(() => {
            if ('section' in section_or_input && !section_or_input.help_is_visible) {
                this.set_side_btns_offset_bottom_val(
                    { input: section_or_input as i_inputs.Input },
                    e,
                );
            }
        }, 'shr_1312');
}

export const SideBtn = Class.get_instance();
