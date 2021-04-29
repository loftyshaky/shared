import { observable } from 'mobx';

declare const global: Global;

declare global {
    let data: any;
}

global.data = observable({
    settings: {},
});
