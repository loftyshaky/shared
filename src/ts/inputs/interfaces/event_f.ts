import { t } from 'shared/internal';
import { i_inputs } from 'inputs/internal';

export interface EventF {
    e: Event;
    input: i_inputs.Input;
    callback: t.CallbackAny;
}
