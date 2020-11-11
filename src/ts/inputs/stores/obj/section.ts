import { configure, observable } from 'mobx';

import {
    i_inputs,
} from 'inputs/internal';

configure({ enforceActions: 'observed' });

export class Section {
    public name: string;
    public include_help?: boolean = false;
    @observable public help_is_visible?: boolean = false;
    public inputs: i_inputs.Inputs | i_inputs.Links;
    public subsections?: {
        name: string;
        inputs: i_inputs.Inputs | i_inputs.Links;
    }[];

    public constructor(obj: Section) {
        Object.assign(
            this,
            obj,
        );
        this.name = obj.name;
        this.inputs = obj.inputs;
    }
}
