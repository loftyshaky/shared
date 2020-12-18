import {
    observable,
    action,
    makeObservable,
} from 'mobx';

import { t } from 'shared/internal';
import { o_inputs } from 'inputs/internal';
import { d_settings } from 'settings/internal';

export class Sections {
    private static i0: Sections;

    constructor() {
        makeObservable(
            this,
            {
                current_section: observable,
                change: action,
            },
        );
    }

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public current_section: string = '';

    public change = (
        {
            section_name,
            callback,
        }:
        {
            section_name: string;
            callback?: t.CallbackVoid;
        },
    ): void => err(() => {
        this.current_section = section_name;

        if (callback) {
            callback();
        }
    },
    's1011');

    public make_shared_sections = (
        {
            download_back_up_callback,
            upload_back_up_callback,
            restore_defaults_callback,
        }: {
            download_back_up_callback: t.CallbackVariadicVoid;
            upload_back_up_callback: t.CallbackVariadicVoid;
            restore_defaults_callback: t.CallbackVoid;
        },
    ): o_inputs.Section[] => err(() => [
        new o_inputs.Section({
            name: 'back_up',
            inputs: [
                new o_inputs.Btn({
                    name: 'download_back_up',
                    event_callback: (): Promise<void> => err_async(async () => {
                        const data_obj = await download_back_up_callback();

                        d_settings.BackUp.i.download({ data_obj });
                    },
                    's1030'),
                }),
                new o_inputs.Btn({
                    name: 'upload_back_up',
                    event_callback: d_settings.BackUp.i.open_file_browser,
                }),
                new o_inputs.File({
                    name: 'back_up',
                    accept: '.json',
                    event_callback: upload_back_up_callback,
                }),
            ],
        }),
        new o_inputs.Section({
            name: 'restore',
            inputs: [new o_inputs.Btn({
                name: 'restore_defaults',
                event_callback: restore_defaults_callback,
            })],
        }),
    ],
    's1025');
}