import { makeObservable, action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { o_inputs, d_inputs, i_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            change_visibility: action,
        });
    }

    public change_visibility = ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): void =>
        err(() => {
            const new_input: o_inputs.Section | i_inputs.Input = section_or_input;

            new_input.help_is_visible = !new_input.help_is_visible;
        }, 'shr_1045');

    width_style? = computedFn(function ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): number | string | undefined {
        const section_name: string | undefined = (section_or_input as i_inputs.Input).section;
        const is_input: boolean = n(section_name);

        if (n(section_name)) {
            return is_input
                ? d_inputs.InputWidth.width_style!({
                      input: section_or_input as i_inputs.Input,
                  })
                : '';
        }

        return undefined;
    });

    msg? = computedFn(function ({
        section_or_input,
    }: {
        section_or_input: o_inputs.Section | i_inputs.Input;
    }): string | undefined {
        const msg_env: string = env.env === 'ext' ? 'ext' : 'app';
        const msg: string = n(section_or_input.alt_help_msg)
            ? (globalThis as any)[msg_env].msg(section_or_input.alt_help_msg) ||
              section_or_input.alt_help_msg
            : (globalThis as any)[msg_env].msg(`${section_or_input.name}_help_text`);
        const regex: RegExp = /@(.*?)@/gm;
        const link_items: RegExpExecArray[] = Array.from(msg.matchAll(regex));
        const links: string[] = link_items.map((link_item: RegExpExecArray): string =>
            err(
                () =>
                    `<a class='link help' href='${(globalThis as any)[msg_env].msg(`${link_item[1]}_help_link_href`)}' target='_blank' rel='noopener noreferrer'>${(globalThis as any)[msg_env].msg(`${link_item[1]}_help_link_text`)}</a>`,
                'shr_1313',
            ),
        );
        let link_i = 0;
        const msg_with_links = msg.replace(regex, (): string =>
            err(() => {
                const link: string = links[link_i];

                link_i += 1;

                return link;
            }, 'shr_1314'),
        );

        return msg_with_links;
    });
}

export const Help = Class.get_instance();
