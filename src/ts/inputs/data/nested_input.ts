import { makeObservable, action } from 'mobx';

import { o_inputs, i_inputs } from 'inputs/internal';
import { d_settings } from 'settings/internal';

export class NestedInput {
    private static i0: NestedInput;

    public static i(): NestedInput {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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
        }, 'shr_1028');

    public set_parent_disbled_vals = ({
        input,
        sections,
    }: {
        input: i_inputs.Input;
        sections: i_inputs.Sections;
    }): void =>
        err(() => {
            if (d_settings.Sections.i().current_section !== '') {
                const section = sections[d_settings.Sections.i().current_section];

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
                                        err(() => input_3.name === parent_input.parent, 'shr_1029'),
                                    );

                                    if (n(parent_2)) {
                                        parent_input = parent_2;
                                        parents.push(parent_input.name);

                                        get_parent();
                                    } else {
                                        const new_parent_disabled: boolean = !parents.every(
                                            (parent: string) =>
                                                err(() => data.settings[parent], 'shr_1030'),
                                        );

                                        input_2.parent_disabled =
                                            input.section ===
                                            d_settings.Sections.i().current_section
                                                ? new_parent_disabled
                                                : input_2.parent_disabled;
                                    }
                                }
                            }, 'shr_1031');

                        if (n(parent_input.parent)) {
                            get_parent();
                        }
                    }, 'shr_1032'),
                );
            }
        }, 'shr_1033');

    public set_all_parents_disbled_vals = ({ sections }: { sections: i_inputs.Sections }): void =>
        err(() => {
            Object.values(sections).forEach((section: o_inputs.Section): void =>
                err(() => {
                    Object.values(section.inputs).forEach((input: i_inputs.Input): void =>
                        err(() => {
                            this.set_parent_disbled_vals({
                                input,
                                sections,
                            });
                        }, 'shr_1034'),
                    );
                }, 'shr_1035'),
            );
        }, 'shr_1036');
}
