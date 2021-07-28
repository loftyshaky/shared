import { App } from 'shared/app';

export { App } from 'shared/app';

declare const global: Global;

declare global {
    const app: App;
}

global.app = App.i();
