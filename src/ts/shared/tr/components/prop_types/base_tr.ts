import { t } from 'shared/internal';

export interface BaseTr {
    name: string; // effect name ex: fade
    tag: any;
    cls: string;
    state: boolean;
    attr?: Record<string, string>;
    style?: Record<string, string | number | undefined>;
    tr_end_unactive?: t.CallbackVoid[];
    tr_end_active?: t.CallbackVoid[];
}
