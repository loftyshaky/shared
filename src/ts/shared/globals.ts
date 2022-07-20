import { X } from 'shared/x';

declare const globalThis: Global;

declare global {
    const x: X;
}

globalThis.x = X.i();
