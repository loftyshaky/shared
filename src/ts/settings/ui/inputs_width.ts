import _ from 'lodash';
import { makeObservable, observable, action, runInAction } from 'mobx';

import { s_css_vars } from 'shared/internal';
import { o_inputs } from 'inputs/internal';
import { d_settings } from 'settings/internal';

export class InputsWidth {
    private static i0: InputsWidth;

    public static i(): InputsWidth {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            width: observable,
            max_width: observable,
            set_max_width: action,
        });
    }

    public width: { [index: string]: number | undefined } = {};
    public max_width: number = 0;
    private min_width: number = 298;
    private old_max_width: { [index: string]: number } = {};

    public calculate_for_section = ({ section_name }: { section_name: string }): void => {
        window.requestAnimationFrame(
            (): Promise<void> =>
                err_async(async () => {
                    const input_ws = sa<HTMLSpanElement>(
                        `.section.${section_name} .input_item .input_w.calculate_width`,
                    );

                    runInAction(() =>
                        err(() => {
                            this.width[section_name] = undefined;
                        }, 'shr_1154'),
                    );

                    const get_input_w_with_max_width = (): HTMLSpanElement | undefined =>
                        err(() => {
                            const input_w_with_max_width = _.maxBy(
                                input_ws,
                                (input_w): number => input_w.offsetWidth,
                            );

                            return input_w_with_max_width;
                        }, 'shr_1055');

                    window.requestAnimationFrame(
                        (): Promise<void> =>
                            err_async(async () => {
                                await x.delay(0);

                                const input_w_with_max_width: HTMLSpanElement | undefined =
                                    get_input_w_with_max_width();

                                if (n(input_w_with_max_width)) {
                                    const input_w_max_width =
                                        input_w_with_max_width.offsetWidth < this.min_width
                                            ? this.min_width
                                            : input_w_with_max_width.offsetWidth;

                                    if (input_w_max_width === this.old_max_width[section_name]) {
                                        runInAction(() =>
                                            err(() => {
                                                this.width[section_name] = input_w_max_width;
                                            }, 'shr_1155'),
                                        );
                                    } else {
                                        this.old_max_width[section_name] = input_w_max_width;

                                        this.calculate_for_section({ section_name });
                                    }
                                }
                            }, 'shr_1056'),
                    );
                }, 'shr_1057'),
        );
    };

    public calculate_for_all_sections = ({
        sections,
    }: {
        sections: { [index: string]: o_inputs.Section };
    }): void =>
        err(() => {
            Object.values(sections).forEach((section: o_inputs.Section): void =>
                err(() => {
                    this.calculate_for_section({ section_name: section.name });
                }, 'shr_1134'),
            );
        }, 'shr_1058');

    public set_max_width = (): void =>
        err(() => {
            const current_section = s<HTMLDivElement>(
                `.section.${d_settings.Sections.i().current_section}`,
            );

            if (current_section) {
                this.max_width = Math.max(
                    current_section.offsetWidth -
                        parseInt(s_css_vars.Main.i().get({ name: 'help_btn_size' }), 10) -
                        parseInt(s_css_vars.Main.i().get({ name: 'help_btn_margin' }), 10),
                    this.min_width,
                );
            }
        }, 'shr_1059');
}
