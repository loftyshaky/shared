import type { i_inputs, o_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public focus_input = ({
        input,
        input_el,
    }: {
        input: o_inputs.Text;
        input_el: HTMLElement | null;
    }): void =>
        err(() => {
            if (n(input_el) && input.name.includes('_edit_label_input')) {
                input_el.focus();
            }
        }, 'shr_1329');

    public run_text_btn_action = ({
        input,
        text_btn,
        input_el,
    }: {
        input: i_inputs.Input;
        text_btn: i_inputs.TextBtn;
        input_el: HTMLInputElement | undefined;
    }): Promise<void> =>
        err_async(async () => {
            if (n(input_el)) {
                input_el.focus();
            }

            text_btn.event_callback({ input });
        }, 'shr_1214');
}

export const Text = Class.get_instance();
