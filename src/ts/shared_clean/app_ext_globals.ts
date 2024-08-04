declare const globalThis: Global;

globalThis.is_ext =
    // @ts-expect-error no types
    typeof browser !== 'undefined' ||
    // @ts-expect-error no types
    (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined');

export {}; // need to be here, otherwise there will be error in this file
