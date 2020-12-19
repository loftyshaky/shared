import { i_inputs } from 'inputs/internal';

export interface InputItem {
    input: i_inputs.Input;
    input_w: JSX.Element;
    include_label: boolean;
}
