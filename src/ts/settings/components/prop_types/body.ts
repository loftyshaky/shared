import { t } from 'shared/internal';
import { i_inputs } from 'inputs/internal';

export interface Body {
    sections: i_inputs.Sections;
    initial_section: string;
    change_section_callback: t.CallbackVoid;
}
