import { t } from 'shared_clean/internal';
import { i_inputs } from 'inputs/internal';

export interface Body {
    sections: i_inputs.Sections;
    initial_section: string;
    change_section_callback: t.CallbackVoid;
    enable_developer_mode_save_callback?: t.CallbackVoid;
}
