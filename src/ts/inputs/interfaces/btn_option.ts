import { t } from 'shared/internal';

export interface BtnOption {
    name: string;
    type: 'link' | 'link_btn';
    href?: string;
    val?: string;
    alt_msg?: string;
    event_callback: t.CallbackVariadicVoid;
}
