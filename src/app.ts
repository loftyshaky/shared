import { init_page, App } from 'shared/app';

export { App } from 'shared/app';

declare const globalThis: Global;

globalThis.app = App.i();

init_page(); // need to be here, otherwise error will happen
