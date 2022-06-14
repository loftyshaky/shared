import { init_page, App } from 'shared/app';

export { App } from 'shared/app';

declare const global: Global;

declare global {
    const app: App;
}

global.app = App.i();

init_page(); // need to be here, otherwise error will happen
