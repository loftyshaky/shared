import type { o_inputs } from 'inputs/internal';
import { d_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public set_up_resize_observer = ({
        input,
        input_el,
    }: {
        input: o_inputs.Textarea;
        input_el: HTMLTextAreaElement | null;
    }): void =>
        err(() => {
            if (n(input_el)) {
                new ResizeObserver(() => {
                    d_inputs.InputWidth.resize_textarea_with_resize_handle({
                        input,
                        textarea: input_el,
                    });
                }).observe(input_el);
            }
        }, 'shr_1330');
}

export const Textarea = Class.get_instance();
