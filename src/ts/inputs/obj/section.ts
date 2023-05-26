import { makeObservable, observable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { i_inputs } from 'inputs/internal';
import { d_settings } from 'settings/internal';

export class Section {
    public name: string;
    public include_help?: boolean = false;
    public help_is_visible?: boolean = false;
    public content_is_visible?: boolean = false;
    public content_is_hideable?: boolean = false;
    public alt_msg?: string;
    public alt_help_msg?: string;
    public inputs: i_inputs.Inputs | i_inputs.Links;
    public available?: boolean = true;
    public unavailable_msg?: string = '';
    public include_offers?: boolean = false;
    public subsections?: {
        name: string;
        inputs: i_inputs.Inputs | i_inputs.Links;
    }[];

    public change_visibility_of_content_save_callback?: ({ bool }: { bool: boolean }) => void;

    public constructor(obj: Section) {
        makeObservable(this, {
            help_is_visible: observable,
            content_is_visible: observable,
            available: observable,
            set_content_is_visible: action,
            change_visibility_of_content: action,
        });

        Object.assign(this, obj);
        this.name = obj.name;
        this.inputs = obj.inputs;

        Object.values(obj.inputs).forEach((obj_2) => {
            obj_2.section = this.name;
        });
    }

    public visibility_cls? = computedFn(function ({ section }: { section: Section }): string {
        return section.name === d_settings.Sections.i().current_section ? '' : 'hidden';
    });

    public show_content_link_btn_is_visible? = computedFn(function (this: Section): boolean {
        return n(this.content_is_visible) && !this.content_is_visible;
    });

    public hide_content_link_btn_is_visible? = computedFn(function (this: Section): boolean {
        return n(this.content_is_visible) && this.content_is_visible;
    });

    public set_content_is_visible? = (): Promise<void> =>
        err_async(async () => {
            this.content_is_visible = data.settings[`${this.name}_section_content_is_visible`];
        }, 'shr_1265');

    public change_visibility_of_content? = (): Promise<void> =>
        err_async(async () => {
            this.content_is_visible = !this.content_is_visible;

            if (n(this.change_visibility_of_content_save_callback)) {
                await this.change_visibility_of_content_save_callback({
                    bool: this.content_is_visible,
                });
            }
        }, 'shr_1264');
}
