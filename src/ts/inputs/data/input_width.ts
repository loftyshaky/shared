import maxBy from 'lodash/maxBy';
import { makeObservable, observable, action, runInAction } from 'mobx';
import { computedFn } from 'mobx-utils';

import { s_css_vars } from 'shared_clean/internal';
import { i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            width: observable,
            max_width_ob: observable,
            resize_textarea_with_resize_handle: action,
        });
    }

    public width: number = 0;
    private min_width: number = 0;
    private max_width: number = 0;
    public max_width_ob: Record<string, string | undefined> = {};
    private old_width: number = 0;

    width_style? = computedFn(function (
        this: Class,
        {
            input,
            input_w,
            calculate_width = true,
        }: {
            input: i_inputs.Input;
            input_w?: HTMLElement | undefined;
            calculate_width?: boolean;
        },
    ): string {
        if (calculate_width && n(input.section)) {
            const get_width = (): string =>
                err(() => {
                    if (
                        this.width !== 0 &&
                        n(this.width) &&
                        (!n(input_w) ||
                            (n(input_w) &&
                                x.matches(input_w, '.checkbox') &&
                                input_w.offsetWidth > this.width))
                    ) {
                        return x.px(this.width);
                    }

                    return 'auto';
                }, 'shr_1236');

            const width: string = get_width();

            if (width !== 'auto') {
                return width;
            }
        }

        return 'auto';
    });

    public calculate_width_cls = ({ calculate_width }: { calculate_width: boolean }): string =>
        err(() => (calculate_width ? 'calculate_width' : ''), 'shr_1255');

    public set_min_and_max_width = (): void =>
        err(() => {
            this.min_width = +ext.msg('input_min_width_css');
            this.max_width = +ext.msg('input_max_width_css');
        }, 'shr_1239');

    public calculate = (): Promise<void> =>
        new Promise((reslove) => {
            globalThis.requestAnimationFrame((): void =>
                err(() => {
                    const els = sa<HTMLSpanElement>(
                        '.section .input_item .input_w.calculate_width, .section .input_item .label_in_input_item',
                    );

                    runInAction(() =>
                        err(() => {
                            this.width = 0;
                        }, 'shr_1046'),
                    );

                    const get_input_w_with_max_width = (): HTMLSpanElement | undefined =>
                        err(() => {
                            const input_w_with_max_width = maxBy(els, (el): number => {
                                const input_item: HTMLElement | undefined = x.closest(
                                    el,
                                    '.input_item, .btn_w',
                                );

                                return x.matches(input_item, '.checkbox') ? 0 : el.offsetWidth;
                            });

                            return input_w_with_max_width;
                        }, 'shr_1047');

                    globalThis.requestAnimationFrame(
                        (): Promise<void> =>
                            err_async(async () => {
                                await x.delay(0);

                                const input_w_with_max_width: HTMLSpanElement | undefined =
                                    get_input_w_with_max_width();

                                if (n(input_w_with_max_width)) {
                                    const input_w_width_min_width_cond: number =
                                        input_w_with_max_width.offsetWidth < this.min_width
                                            ? this.min_width
                                            : input_w_with_max_width.offsetWidth;
                                    const input_w_width_max_width_cond: number =
                                        input_w_width_min_width_cond > this.max_width
                                            ? this.max_width
                                            : input_w_width_min_width_cond;

                                    if (input_w_width_max_width_cond === this.old_width) {
                                        runInAction(() =>
                                            err(() => {
                                                this.width = input_w_width_max_width_cond;
                                            }, 'shr_1048'),
                                        );
                                    } else {
                                        this.old_width = input_w_width_max_width_cond;

                                        await this.calculate();
                                    }
                                }

                                reslove();
                            }, 'shr_1049'),
                    );
                }, 'shr_1050'),
            );
        });

    public resize_textarea_with_resize_handle = ({
        input,
        textarea,
    }: {
        input: i_inputs.Input;
        textarea: HTMLTextAreaElement | null;
    }): void =>
        err(() => {
            if (n(textarea)) {
                const inputs: HTMLElement = x.closest(textarea, '.inputs');
                const input_item: HTMLElement = x.closest(textarea, '.input_item');
                const help_btn = sb<HTMLElement>(input_item, '.help_btn');
                const inputs_width: number = x.get_float_css_val(inputs, 'width');
                const input_item_margin_left: number = x.get_numeric_css_val(
                    input_item,
                    'margin-left',
                );
                const help_btn_size: number = parseInt(
                    s_css_vars.CssVars.get({ name: 'help_btn_size' }),
                    10,
                );
                const help_btn_margin: number = parseInt(
                    s_css_vars.CssVars.get({ name: 'help_btn_margin' }),
                    10,
                );
                const max_width_help_btn_not_accounted: number =
                    inputs_width - input_item_margin_left;
                const max_width: number = n(help_btn)
                    ? max_width_help_btn_not_accounted - (help_btn_size + help_btn_margin)
                    : max_width_help_btn_not_accounted;

                this.max_width_ob[input.name] = x.px(max_width);
            }
        }, 'shr_1238');
}

export const InputWidth = Class.get_instance();
