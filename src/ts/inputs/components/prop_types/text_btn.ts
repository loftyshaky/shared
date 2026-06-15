import type { o_inputs } from 'inputs/internal';
import type { t } from 'shared_clean/internal';

export interface TextBtn {
    name: string;
    Svg: string;
    input: o_inputs.Text;
    on_click?: t.CallbackVoid;
}
