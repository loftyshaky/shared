import { init_page, Ext } from 'shared_clean/ext';

export { Ext } from 'shared_clean/ext';

declare const globalThis: Global;

globalThis.ext = Ext.i();

init_page(); // need to be here, otherwise error will happen
