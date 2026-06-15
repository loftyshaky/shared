import type { o_inputs } from 'inputs/internal';
import type { t } from 'shared_clean/internal';

export interface SectionBtn {
    section: o_inputs.Section;
    change_section_callback: t.CallbackVoid;
    enable_developer_mode_save_callback?: t.CallbackVoid;
}
