import { t } from 'shared/internal';

import { o_inputs } from 'inputs/internal';

export interface TextBtn {
    name: string;
    svg_name: string;
    input: o_inputs.Text;
    on_click?: t.CallbackAny;
}
