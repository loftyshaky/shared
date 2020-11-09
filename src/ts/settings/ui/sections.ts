import { configure, observable, action } from 'mobx';

import { t } from 'shared/internal';

configure({ enforceActions: 'observed' });

export class Sections {
    private static i0: Sections;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    @observable public current_section: string = '';

    @action public change = (
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
