import { init_page, App } from 'shared_clean/app';

export { App } from 'shared_clean/app';

declare const globalThis: Global;

globalThis.app = App.i();

init_page(); // need to be here, otherwise error will happen
