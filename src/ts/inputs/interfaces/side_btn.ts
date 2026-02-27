import { t } from 'shared_clean/internal';

export interface SideBtn {
    name: string;
    Svg: string;
    is_enabled_cond?: t.CallbackVariadicBoolean;
    event_callback: t.CallbackVariadicVoid;
}
