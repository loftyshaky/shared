import { X } from 'shared/x';
import { Ext } from 'shared/ext';

declare global {
    const x: X;
    const ext: Ext;
}

window.x = X.i();
window.ext = Ext.i();
