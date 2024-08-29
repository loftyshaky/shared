import get from 'lodash/get';
import { makeObservable, action } from 'mobx';

import { o_inputs, i_inputs } from 'inputs/internal';
import { d_sections } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    public constructor() {
        makeObservable(this, {
            calculate_offset: action,
            set_parent_disbled_vals: action,
        });
    }

    public calculate_offset = ({ input }: { input: i_inputs.Input }): void =>
        err(() => {
            let parent_offset: number = 0;
            const is_child: boolean = n(input.parent);

            if (is_child) {
                const parent_el = s<HTMLElement>(`.${input.parent}`);

                if (n(parent_el)) {
                    parent_offset = x.get_numeric_css_val(parent_el, 'margin-left');
                }
            }

            input.offset = (is_child ? parent_offset + 28 : 0).toString();
        }, 'shr_1054');

    public set_parent_disbled_vals = ({
        input,
        sections,
        set_to_all_sections = false,
    }: {
        input: i_inputs.Input;
        sections: i_inputs.Sections;
        set_to_all_sections?: boolean;
    }): void =>
        err(() => {
            const set_parent_disbled_vals_inner = ({
                section,
            }: {
                section: o_inputs.Section;
            }): void =>
                err(() => {
                    Object.values(section.inputs).forEach((input_2: i_inputs.Input): void =>
                        err(() => {
                            let parent_input: i_inputs.Input = input_2;
                            const parents: string[] = [];

                            const get_parent = (): void =>
                                err(() => {
                                    if (n(parent_input)) {
                                        const parent_2: i_inputs.Input = Object.values(
                                            section.inputs,
                                        ).find((input_3: i_inputs.Input) =>
                                            err(
                                                () => input_3.name === parent_input.parent,
                                                'shr_1055',
                                            ),
                                        );

                                        if (n(parent_2)) {
                                            parent_input = parent_2;
                                            parents.push(parent_input.name);

                                            get_parent();
                                        } else {
                                            const new_parent_disabled: boolean = !parents.every(
                                                (parent: string) =>
                                                    err(() => {
                                                        if (n(parent_input.val_accessor)) {
                                                            const val = get(
                                                                data,
                                                                parent_input.val_accessor,
                                                            );

                                                            return val;
                                                        }

                                                        return data.settings.prefs[parent];
                                                    }, 'shr_1056'),
                                            );

                                            input_2.parent_disabled =
                                                input.section ===
                                                    d_sections.Sections.current_section ||
                                                set_to_all_sections
                                                    ? new_parent_disabled
                                                    : input_2.parent_disabled;
                                        }
                                    }
                                }, 'shr_1057');

                            if (n(parent_input.parent)) {
                                get_parent();
                            }

                            if (input_2.type === 'group' && n(input_2.inputs)) {
                                (input_2.inputs as i_inputs.Input[]).forEach(
                                    (input_3: i_inputs.Input): void =>
                                        err(() => {
                                            input_3.parent_disabled = !input_2.is_enabled;
                                        }, 'shr_1263'),
                                );
                            }
                        }, 'shr_1058'),
                    );
                }, 'shr_1196');

            if (set_to_all_sections) {
                Object.values(sections).forEach((section: o_inputs.Section): void =>
                    err(() => {
                        set_parent_disbled_vals_inner({ section });
                    }, 'shr_1197'),
                );
            } else if (d_sections.Sections.current_section !== '') {
                const section = sections[d_sections.Sections.current_section];

                set_parent_disbled_vals_inner({ section });
            }
        }, 'shr_1059');

    public set_all_parents_disbled_vals = ({
        sections,
        set_to_all_sections = false,
    }: {
        sections: i_inputs.Sections;
        set_to_all_sections?: boolean;
    }): void =>
        err(() => {
            Object.values(sections).forEach((section: o_inputs.Section): void =>
                err(() => {
                    Object.values(section.inputs).forEach((input: i_inputs.Input): void =>
                        err(() => {
                            this.set_parent_disbled_vals({
                                input,
                                sections,
                                set_to_all_sections,
                            });
                        }, 'shr_1060'),
                    );
                }, 'shr_1061'),
            );
        }, 'shr_1062');
}

export const NestedInput = Class.get_instance();
