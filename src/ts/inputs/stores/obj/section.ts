import _ from 'lodash';
import {
    makeObservable,
    observable,
} from 'mobx';

import {
    i_inputs,
} from 'inputs/internal';

export class Section {
    public name: string;
    public include_help?: boolean = false;
    public help_is_visible?: boolean = false;
    public alt_help_msg?: string;
    public inputs: i_inputs.Inputs | i_inputs.Links;
    public subsections?: {
        name: string;
        inputs: i_inputs.Inputs | i_inputs.Links;
    }[];

    public constructor(obj: Section) {
        makeObservable(this,
            {
                help_is_visible: observable,
            });

        Object.assign(
            this,
            obj,
        );
        this.name = obj.name;
        this.inputs = obj.inputs;

        Object.values(obj.inputs).forEach(
            (obj_2) => {
                obj_2.section = this.name;
            },
        );
    }
}
