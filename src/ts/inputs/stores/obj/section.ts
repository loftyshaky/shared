import _ from 'lodash';
import {
    configure,
    observable,
    makeObservable,
} from 'mobx';

import {
    i_inputs,
} from 'inputs/internal';

configure({ enforceActions: 'observed' });

export class Section {
    public name: string;
    public include_help?: boolean = false;
    public help_is_visible?: boolean = false;
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
        _.map(
            obj.inputs,
            (obj_2) => _.extend(
                { section: this.name },
                obj_2,
            ),
        );
    }
}
