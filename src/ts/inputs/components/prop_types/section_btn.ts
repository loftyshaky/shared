import { t } from 'shared_clean/internal';
import { o_inputs } from 'inputs/internal';

export interface SectionBtn {
    section: o_inputs.Section;
    change_section_callback: t.CallbackVoid;
    enable_developer_mode_save_callback?: t.CallbackVoid;
}
