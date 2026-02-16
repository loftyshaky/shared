import { computedFn } from 'mobx-utils';

import { o_inputs } from 'inputs/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    msg? = computedFn(function ({ section }: { section: o_inputs.Section }): string | undefined {
        return (
            (globalThis as any)[env.env === 'ext' ? 'ext' : 'app'].msg(
                `${section.name}_section_text`,
            ) || x.underscore_to_readable(section.name)
        );
    });
}

export const SectionBtn = Class.get_instance();
