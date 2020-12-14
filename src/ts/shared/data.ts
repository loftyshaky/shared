import { observable } from 'mobx';

declare global {
    let data: any;
}

window.data = observable({
    settings: {},
});
