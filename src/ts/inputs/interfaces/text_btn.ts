import { t } from 'shared/internal';

export interface TextBtn {
    name: string;
    Svg: string;
    visibility_cond?: t.CallbackVariadicVoid;
    event_callback: t.CallbackVariadicVoid;
}
