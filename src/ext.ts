import { init_page, Ext } from 'shared/ext';

export { Ext } from 'shared/ext';

declare const globalThis: Global;

globalThis.ext = Ext.i();

init_page(); // need to be here, otherwise error will happen
