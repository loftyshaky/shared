import { configure, observable } from 'mobx';

import {
    i_inputs,
} from 'inputs/internal';

configure({ enforceActions: 'observed' });

export class Section {
    public name: string;
    public include_help?: boolean = false;
    @observable public help_is_visible?: boolean = false;
    public inputs?: i_inputs.Input[];
    public subsections?: {
        name: string;
        inputs: i_inputs.Input[];
    }[];

    public constructor(obj: Section) {
        this.name = obj.name;
    }
}
