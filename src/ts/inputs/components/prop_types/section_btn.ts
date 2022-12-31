import { t } from 'shared/internal';
import { o_inputs } from 'inputs/internal';

export interface SectionBtn {
    section: o_inputs.Section;
    change_section_callback: t.CallbackVoid;
    enable_developer_mode_callback?: t.CallbackVoid;
}
