import get from 'lodash/get';
import { computedFn } from 'mobx-utils';

import { o_inputs, i_inputs } from 'inputs/internal';

export class Group extends o_inputs.InputBase {
    public type? = 'group' as const;
    public inputs?: i_inputs.Inputs;
    public content_is_visible_val_accessor?: string;
    public content_is_visible_default?: boolean = true;

    public constructor(obj: Group) {
        super(obj);
        Object.assign(this, obj);

        this.inputs = obj.inputs;
    }

    content_is_visible_computed? = computedFn(function (this: Group): boolean {
        if (n(this.content_is_visible_default)) {
            if (n(this.content_is_visible_val_accessor)) {
                const is_visible_val = get(data, this.content_is_visible_val_accessor);

                if (n(is_visible_val)) {
                    return is_visible_val === true || is_visible_val === 1;
                }
            }

            return this.content_is_visible_default;
        }

        return true;
    });

    content_is_visible_cls? = computedFn(function (this: Group): string {
        return this.content_is_visible_computed!() ? '' : 'hidden';
    });

    content_is_visible_margin_cls? = computedFn(function (this: Group): string {
        return this.type !== 'group' || this.content_is_visible_computed!()
            ? ''
            : 'margin_bottom_0';
    });

    public is_column_layout_cond? = () => (this.is_column_layout ? 'is_column_layout' : '');
}
