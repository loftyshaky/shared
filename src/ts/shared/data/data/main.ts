import { observable } from 'mobx';

import { t } from 'shared/internal';

declare const global: Global;

declare global {
    let data: t.AnyRecord;
}

global.data = observable({
    settings: {},
});
