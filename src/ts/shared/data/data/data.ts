import { observable } from 'mobx';

declare const globalThis: Global;

globalThis.data = observable({
    settings: {},
});
