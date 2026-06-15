import { makeObservable, observable } from 'mobx';

import type { i_inputs } from 'inputs/internal';
import { o_inputs } from 'inputs/internal';
import type { t } from 'shared_clean/internal';
import { s_env } from 'shared_clean/internal';

export class Select extends o_inputs.InputBase {
    public type? = 'select' as const;
    public options: i_inputs.Options = {};

    public constructor(obj: Select) {
        super(obj);

        makeObservable(this, {
            options: observable,
        });

        Object.assign(this, obj);
        this.options = obj.options;
    }

    public option_text? = ({ i }: { i: number }): string =>
        err(() => {
            const option: o_inputs.Option = this.options[this.name][i];

            return (
                option.alt_msg ||
                (globalThis as t.AnyRecord)[s_env.Env.type()].msg(`${option.name}_option_text`) ||
                option.name
            );
        }, 'shr_1072');
}
