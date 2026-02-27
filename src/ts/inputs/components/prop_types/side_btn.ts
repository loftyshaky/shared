import { t } from 'shared_clean/internal';
import { i_inputs } from 'inputs/internal';

export interface SideBtn {
    name: string;
    Svg: string;
    input: i_inputs.Input;
    on_click?: t.CallbackVoid;
}
