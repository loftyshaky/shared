import { action } from 'mobx';

import type { o_inputs } from 'inputs/internal';
import { s_env } from 'shared_clean/internal';
import type { t } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    private set_placeholder_text = action(
        ({ input, msg_key }: { input: o_inputs.Text; msg_key: string }): void =>
            err(() => {
                input.placeholder = (globalThis as t.AnyRecord)[s_env.Env.type()].msg(msg_key);
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
}

export const Text = Class.get_instance();
