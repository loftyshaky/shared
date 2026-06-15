import { App, init_page } from 'shared_clean/app';

export { App } from 'shared_clean/app';

globalThis.app = App;

init_page(); // need to be here, otherwise error will happen
