import { observable } from 'mobx';

import { t } from 'shared/internal';

declare const globalThis: Global;

declare global {
    let data: t.AnyRecord;
}

globalThis.data = observable({
    settings: {},
});
