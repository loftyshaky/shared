import { makeObservable, observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { t } from 'shared_clean/internal';
import { d_offers } from 'shared/internal';
import { o_inputs, d_inputs, d_color, i_inputs } from 'inputs/internal';
import { d_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            current_section: observable,
            change: action,
        });
    }

    public current_section: string = '';
    private options: i_inputs.Options = {};

    public init_options = (): void =>
        err(() => {
            this.options = {
                options_page_theme: [
                    new o_inputs.Option({ name: 'light' }),
                    new o_inputs.Option({ name: 'dark' }),
                    new o_inputs.Option({ name: 'very_dark' }),
                    new o_inputs.Option({ name: 'clover' }),
                    new o_inputs.Option({ name: 'aqua' }),
                    new o_inputs.Option({ name: 'lavender' }),
                    new o_inputs.Option({ name: 'ruby' }),
                ],
            };
        }, 'shr_1082');

    public get_shared_input = ({
        input_change_val_callback,
    }: {
        input_change_val_callback: t.CallbackVariadicVoid;
    }): { [index: string]: i_inputs.Input } =>
        err(
            () => ({
                options_page_theme: new o_inputs.Select({
                    name: 'options_page_theme',
                    options: this.options,
                    event_callback: input_change_val_callback,
                }),
                transition_duration: new o_inputs.Text({
                    name: 'transition_duration',
                    text_type: 'number',
                    allow_removing_val: false,
                    event_callback: input_change_val_callback,
                    warn_state_checker: d_inputs.Val.validate_input,
                }),
            }),
            'shr_1223',
        );

    public selected_cls = computedFn(function (
        this: Class,
        { section_name }: { section_name: string },
    ): string {
        return this.current_section === section_name ? 'selected' : '';
    });

    public tab_index = computedFn(function (
        this: Class,
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
                d_color.Visibility.previously_visible_color_picker_i = undefined;
                d_color.Visibility.previously_visible_input = undefined;

                this.current_section = section_name;

                if (callback) {
                    callback();
                }
            }
        }, 'shr_1083');

    private reload_ext = (): void =>
        err(() => {
            ext.send_msg({ msg: 'reload_ext' });
        }, 'shr_1084');

    public make_shared_sections = ({
        download_back_up_callback,
        download_back_up_final_callback,
        upload_back_up_callback,
        restore_defaults_callback,
        input_change_val_callback,
        admin_inputs = [],
        back_up_inputs = [],
        restore_inputs = [],
        include_back_up_help = false,
        restore_help_msg = undefined,
        download_backup = true,
        include_part_i_in_back_up_name = false,
        allow_multiple_file_backup_upload = false,
        admin_content_is_hideable = false,
        admin_change_visibility_of_content_save_callback,
    }: {
        download_back_up_callback: t.CallbackAnyObj;
        download_back_up_final_callback?: t.CallbackVoid;
        upload_back_up_callback: t.CallbackVariadicVoid;
        restore_defaults_callback: t.CallbackVoid;
        input_change_val_callback: t.CallbackVariadicVoid;
        admin_inputs?: i_inputs.Input[];
        back_up_inputs?: i_inputs.Input[];
        restore_inputs?: i_inputs.Input[];
        include_back_up_help?: boolean;
        restore_help_msg?: string | undefined;
        download_backup?: boolean;
        include_part_i_in_back_up_name?: boolean;
        allow_multiple_file_backup_upload?: boolean;
        admin_content_is_hideable?: boolean;
        admin_change_visibility_of_content_save_callback?: t.CallbackVariadicVoid;
    }): o_inputs.Section[] =>
        err(
            () => [
                new o_inputs.Section({
                    name: 'restore',
                    include_help: include_back_up_help,
                    alt_help_msg: restore_help_msg,
                    inputs: [
                        new o_inputs.Btn({
                            name: 'restore_defaults',
                            event_callback: restore_defaults_callback,
                        }),
                        ...restore_inputs,
                        new o_inputs.Btn({
                            name: 'download_back_up',
                            event_callback: (): Promise<void> =>
                                err_async(async () => {
                                    const data_obj = await download_back_up_callback();

                                    if (download_backup) {
                                        d_sections.BackUp.download({
                                            data_obj,
                                            part_i: include_part_i_in_back_up_name ? 0 : 'none',
                                        });

                                        if (n(download_back_up_final_callback)) {
                                            download_back_up_final_callback();
                                        }
                                    }
                                }, 'shr_1085'),
                        }),
                        new o_inputs.Btn({
                            name: 'upload_back_up',
                            event_callback: d_sections.BackUp.open_file_browser,
                        }),
                        new o_inputs.File({
                            name: 'back_up',
                            accept: '.json',
                            multiple: allow_multiple_file_backup_upload,
                            event_callback: d_sections.BackUp.upload,
                            save_callback: upload_back_up_callback,
                        }),
                        ...back_up_inputs,
                    ],
                }),
                new o_inputs.Section({
                    name: 'admin',
                    include_help: true,
                    content_is_hideable: admin_content_is_hideable,
                    change_visibility_of_content_save_callback:
                        admin_change_visibility_of_content_save_callback,
                    inputs: [
                        new o_inputs.Btn({
                            name: 'reload_ext',
                            event_callback: this.reload_ext,
                        }),
                        this.get_shared_input({ input_change_val_callback }).options_page_theme,
                        this.get_shared_input({ input_change_val_callback }).transition_duration,
                        new o_inputs.Checkbox({
                            name: 'enable_cut_features',
                            event_callback: input_change_val_callback,
                        }),
                        new o_inputs.Checkbox({
                            name: 'persistent_service_worker',
                            event_callback: input_change_val_callback,
                        }),
                        ...(d_offers.Offers.found_offers_for_current_locale()
                            ? [
                                  new o_inputs.Checkbox({
                                      name: 'offers_are_visible',
                                      developer_mode_setting: true,
                                      event_callback: input_change_val_callback,
                                  }),
                              ]
                            : []),
                        new o_inputs.Checkbox({
                            name: 'developer_mode',
                            developer_mode_setting: true,
                            event_callback: input_change_val_callback,
                        }),
                        new o_inputs.Checkbox({
                            name: 'developer_mode',
                            developer_mode_setting: true,
                            event_callback: input_change_val_callback,
                        }),
                        ...admin_inputs,
                    ],
                }),
            ],
            'shr_1086',
        );
}

export const Sections = Class.get_instance();
