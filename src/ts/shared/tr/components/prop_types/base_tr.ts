import { t } from 'shared/internal';

export interface BaseTr {
    name: string; // effect name ex: fade
    tag: any;
    cls: string;
    state: boolean;
    attr?: { [index: string]: string };
    style?: { [index: string]: string | number | undefined };
    tr_end_unactive?: t.CallbackVariadicVoid[];
    tr_end_active?: t.CallbackVariadicVoid[];
}
