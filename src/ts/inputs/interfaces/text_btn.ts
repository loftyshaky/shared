import { t } from 'shared/internal';

export interface TextBtn {
    name: string;
    Svg: string;
    visibility_cond?: t.CallbackVariadicBoolean;
    event_callback: t.CallbackVariadicVoid;
}
