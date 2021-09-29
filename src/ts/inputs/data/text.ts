import { action } from 'mobx';

import { o_inputs } from 'inputs/internal';

export class Text {
    private static i0: Text;

    public static i(): Text {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private set_placeholder_text = action(
        ({ input, msg_key }: { input: o_inputs.Text; msg_key: string }): void =>
            err(() => {
                input.placeholder = ext.msg(msg_key);
            }, 'shr_1203'),
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
