import {
    observable,
    action,
    makeObservable,
} from 'mobx';

import { t } from 'shared/internal';

export class Sections {
    private static i0: Sections;

    constructor() {
        makeObservable(
            this,
            {
                current_section: observable,
                change: action,
            },
        );
    }

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public current_section: string = '';

    public change = (
        {
            section_name,
            callback,
        }:
        {
            section_name: string;
            callback?: t.CallbackVoid;
        },
    ): void => err(() => {
        this.current_section = section_name;

        if (callback) {
            callback();
        }
    },
    's1011');
}
