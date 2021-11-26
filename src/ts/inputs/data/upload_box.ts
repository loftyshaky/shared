import { ChangeEvent } from 'react';
import { makeObservable, action, runInAction } from 'mobx';

import { o_inputs } from 'inputs/internal';

export class UploadBox {
    private static i0: UploadBox;

    public static i(): UploadBox {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    public constructor() {
        makeObservable(this, {
            highlight: action,
            unhighlight: action,
        });
    }

    public trigger_click_on_file_input = ({
        file_input,
    }: {
        file_input: HTMLInputElement | null;
    }): void =>
        err(() => {
            if (n(file_input)) {
                file_input.click();
            }
        }, 'shr_1198');

    public upload_files = action(
        (
            e: ChangeEvent | DragEvent,
            {
                input,
                file_input,
            }: { input: o_inputs.UploadBox; file_input?: HTMLInputElement | null },
        ): Promise<void> =>
            err_async(async () => {
                e.preventDefault();

                input.error_msg_is_visible = false;
                input.loading_msg_is_visible = true;
                input.drag_counter = 0;
                input.is_in_hover_state = false;

                try {
                    await input.event_callback({
                        files: n((e as DragEvent).dataTransfer)
                            ? (e as DragEvent).dataTransfer!.files
                            : (<HTMLInputElement>e.target).files,
                    });
                } catch (error_obj) {
                    show_err_ribbon(error_obj, 'shr_1202', { silent: true });

                    runInAction(() =>
                        err(() => {
                            input.error_msg_is_visible = true;
                        }, 'shr_1200'),
                    );
                }

                runInAction(() =>
                    err(() => {
                        input.loading_msg_is_visible = false;
                    }, 'shr_1201'),
                );

                if (n(file_input)) {
                    file_input.value = '';
                }
            }, 'shr_1199'),
    );

    public highlight = ({ input }: { input: o_inputs.UploadBox }): void =>
        err(() => {
            if (n(input.drag_counter)) {
                input.drag_counter += 1;
                input.is_in_hover_state = true;
            }
        }, 'shr_1211');

    public unhighlight = ({ input }: { input: o_inputs.UploadBox }): void =>
        err(() => {
            if (n(input.drag_counter)) {
                input.drag_counter -= 1;

                if (input.drag_counter === 0) {
                    input.is_in_hover_state = false;
                }
            }
        }, 'shr_1212');
}
