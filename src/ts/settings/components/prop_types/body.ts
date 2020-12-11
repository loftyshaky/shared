import { t } from 'shared/internal';
import { o_inputs } from 'inputs/internal';

export interface Body {
    sections: { [index: string]: o_inputs.Section };
    initial_section: string;
    change_section_callback: t.CallbackVoid;
}
