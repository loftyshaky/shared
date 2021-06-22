import { makeObservable, observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared/internal';
import { o_inputs, d_inputs, d_color, i_inputs } from 'inputs/internal';
import { d_settings } from 'settings/internal';

export class Sections {
    private static i0: Sections;

    public static i(): Sections {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            current_section: observable,
            change: action,
        });
    }

    public current_section: string = '';
    private options: any = {
        options_page_theme: [
            new o_inputs.Option({ name: 'light' }),
            new o_inputs.Option({ name: 'dark' }),
            new o_inputs.Option({ name: 'very_dark' }),
        ],
    };

    public selected_cls = computedFn(function (
        this: Sections,
        { section_name }: { section_name: string },
    ): string {
        return this.current_section === section_name ? 'selected' : '';
    });

    public tab_index = computedFn(function (
        this: Sections,
        { section_name }: { section_name: string },
    ): number | undefined {
        return this.current_section === section_name ? -1 : undefined;
    });

    public change = ({
        section_name,
        callback,
    }: {
        section_name: string;
        callback?: t.CallbackVoid;
    }): void =>
        err(() => {
            if (this.current_section !== section_name) {
                d_color.Visibility.i().previously_visible_color_picker_i = undefined;
                d_color.Visibility.i().previously_visible_input = undefined;

                this.current_section = section_name;

                if (callback) {
                    callback();
                }
            }
        }, 'shr_1052');

    public make_shared_sections = ({
        download_back_up_callback,
        upload_back_up_callback,
        restore_defaults_callback,
        input_change_val_callback,
        admin_inputs = [],
    }: {
        download_back_up_callback: t.CallbackVariadicVoid;
        upload_back_up_callback: t.CallbackVariadicVoid;
        restore_defaults_callback: t.CallbackVoid;
        input_change_val_callback: t.CallbackVariadicVoid;
        admin_inputs?: i_inputs.Input[];
    }): o_inputs.Section[] =>
        err(
            () => [
                new o_inputs.Section({
                    name: 'back_up',
                    inputs: [
                        new o_inputs.Btn({
                            name: 'download_back_up',
                            event_callback: (): Promise<void> =>
                                err_async(async () => {
                                    const data_obj = await download_back_up_callback();

                                    d_settings.BackUp.i().download({ data_obj });
                                }, 'shr_1053'),
                        }),
                        new o_inputs.Btn({
                            name: 'upload_back_up',
                            event_callback: d_settings.BackUp.i().open_file_browser,
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
                    inputs: [
                        new o_inputs.Btn({
                            name: 'restore_defaults',
                            event_callback: restore_defaults_callback,
                        }),
                    ],
                }),
                new o_inputs.Section({
                    name: 'admin',
                    include_help: true,
                    inputs: [
                        new o_inputs.Select({
                            name: 'options_page_theme',
                            options: this.options,
                            event_callback: input_change_val_callback,
                        }),
                        new o_inputs.Text({
                            name: 'transition_duration',
                            text_type: 'number',
                            event_callback: input_change_val_callback,
                            warn_state_checker: d_inputs.Val.i().validate_input,
                        }),
                        ...admin_inputs,
                    ],
                }),
            ],
            'shr_1054',
        );
}
