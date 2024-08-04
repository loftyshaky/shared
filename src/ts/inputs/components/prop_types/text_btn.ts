import { t } from 'shared_clean/internal';
import { o_inputs } from 'inputs/internal';

export interface TextBtn {
    name: string;
    Svg: string;
    input: o_inputs.Text;
    on_click?: t.CallbackVoid;
}
