import { action } from 'mobx';

import { o_inputs, i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private set_placeholder_text = action(
        ({ input, msg_key }: { input: o_inputs.Text; msg_key: string }): void =>
            err(() => {
                input.placeholder = (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                    msg_key,
                );
            }, 'shr_1203'),
    );

    public clear_placeholder_text = action(({ input }: { input: o_inputs.Text }): void =>
        err(() => {
            input.placeholder = '';
        }, 'shr_1213'),
    );

    public set_loading_placeholder_text = action(({ input }: { input: o_inputs.Text }): void =>
        err(() => {
            this.set_placeholder_text({ input, msg_key: 'loading_msg_text' });
        }, 'shr_1204'),
    );

    public set_error_placeholder_text = action(({ input }: { input: o_inputs.Text }): void =>
        err(() => {
            this.set_placeholder_text({ input, msg_key: 'an_error_occured_msg' });
        }, 'shr_1205'),
    );

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
