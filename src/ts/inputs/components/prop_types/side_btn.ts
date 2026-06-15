import type { i_inputs } from 'inputs/internal';
import type { t } from 'shared_clean/internal';

export interface SideBtn {
    name: string;
    alt_title: string | undefined;
    Svg: string;
    input: i_inputs.Input;
    on_click?: t.CallbackVoid;
}
