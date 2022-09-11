import { ChangeEvent } from 'react';

import { t } from 'shared/internal';
import { o_inputs } from 'inputs/internal';

export class BackUp {
    private static i0: BackUp;

    public static i(): BackUp {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public download = ({ data_obj }: { data_obj: t.AnyRecord | string }): void =>
        err(() => {
            const blob: Blob = new Blob(
                [typeof data_obj === 'string' ? data_obj : JSON.stringify(data_obj)],
                {
                    type: 'application/octet-stream',
                },
            );
            const app_name: string = env.env === 'ext' ? we.runtime.getManifest().name : 'App';
            const locale: string =
                env.env === 'ext'
                    ? new Date().toLocaleString(ext.msg('@@ui_locale'))
                    : (ext as any).get_language();

            const a = document.createElement('a');
            x.append(document.body, a);

            a.href = URL.createObjectURL(blob);
            a.download = `${x.sanitize_filename(app_name)} back up ${new Date().toLocaleString(
                locale.replace(/_/, '-'),
            )}.json`;
            a.click();
            x.remove(a);
        }, 'shr_1075');

    public open_file_browser = (): void =>
        err(() => {
            const upload_back_up_input = s<HTMLInputElement>('.file.back_up');

            if (upload_back_up_input) {
                upload_back_up_input.click();
            }
        }, 'shr_1076');

    public upload = (
        {
            input,
        }: {
            input: o_inputs.File;
        },
        e: ChangeEvent,
    ): Promise<void> =>
        err_async(
            async () => {
                const blob: Blob = (e.target as HTMLInputElement).files![0];

                const back_up_file_input = s<HTMLInputElement>('.file.back_up');

                if (n(back_up_file_input)) {
                    back_up_file_input.value = '';
                }

                if (blob.type === 'application/json') {
                    const data_string: string = (await this.read({ blob })) as string;

                    if (n(input.save_callback)) {
                        input.save_callback({ data_obj: JSON.parse(data_string) });
                    }
                } else {
                    throw_err('Invalid file type');
                }
            },
            'shr_1077',
            { error_msg_key: 'invalid_file_type_back_up' },
        );

    private read = ({ blob }: { blob: Blob }): Promise<string | unknown> =>
        err_async(async () => {
            const reader = new FileReader();

            return new Promise((resolve, reject): void => {
                err(() => {
                    reader.onloadend = (): void =>
                        err(() => {
                            resolve(reader.result);
                        }, 'shr_1078');

                    reader.onerror = (): void =>
                        err(() => {
                            reject();
                        }, 'shr_1079');

                    reader.readAsText(blob);
                }, 'shr_1080');
            });
        }, 'shr_1081');
}
