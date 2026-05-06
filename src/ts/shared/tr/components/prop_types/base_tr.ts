import { t } from 'shared_clean/internal';

export interface BaseTr {
    name: string; // effect name ex: fade
    tag: any;
    cls: string;
    state: boolean;
    attr?: Record<string, any>;
    style?: Record<string, string | number | undefined>;
    tr_end_unactive?: t.CallbackVariadicVoid[];
    tr_end_active?: t.CallbackVariadicVoid[];
    children: React.ReactNode;
}
