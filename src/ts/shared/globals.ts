import { X } from 'shared/x';
import { Ext } from 'shared/ext';

declare const global: Global;

declare global {
    const x: X;
    const ext: Ext;
}

global.x = X.i();
global.ext = Ext.i();
