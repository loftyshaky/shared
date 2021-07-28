import { X } from 'shared/x';

declare const global: Global;

declare global {
    const x: X;
}

global.x = X.i();
