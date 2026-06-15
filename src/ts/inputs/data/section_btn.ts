import { computedFn } from 'mobx-utils';

import type { o_inputs } from 'inputs/internal';
import { s_env } from 'shared_clean/internal';
import type { t } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    msg? = computedFn(function ({ section }: { section: o_inputs.Section }): string | undefined {
        return (
            (globalThis as t.AnyRecord)[s_env.Env.type()].msg(`${section.name}_section_text`) ||
            x.underscore_to_readable(section.name)
        );
    });
}

export const SectionBtn = Class.get_instance();
