import { Ext, init_page } from 'shared_clean/ext';

export { Ext } from 'shared_clean/ext';

globalThis.ext = Ext;

init_page(); // need to be here, otherwise error will happen
