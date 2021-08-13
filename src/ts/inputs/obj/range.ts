import { computedFn } from 'mobx-utils';

import { o_inputs, d_inputs } from 'inputs/internal';

export class Range extends o_inputs.InputBase {
    public type?: 'range' = 'range';
    public min?: number = 0;
    public max?: number = 100;
    public step?: number = 1;

    public constructor(obj: Range) {
        super(obj);
        Object.assign(this, obj);
    }

    displayed_val? = computedFn(function ({ input }: { input: Range }): number {
        return n(input.step)
            ? Math.round((d_inputs.Val.i().access({ input }) as number) / input.step)
            : 0;
    });

    lower_fill_percentage? = computedFn(function ({ input }: { input: Range }): number {
        const displayed_val = input.displayed_val!({ input });
        const max_displayed_val = n(input.max) && n(input.step) ? input.max / input.step : 0;

        return (100 * displayed_val) / max_displayed_val;
    });

    lower_fill_width? = computedFn(function ({ input }: { input: Range }): string {
        return `${input.lower_fill_percentage!({ input })}%`;
    });

    help_is_present_cls? = computedFn(function ({ input }: { input: Range }): string {
        return input.include_help ? 'help_is_present' : '';
    });
}
