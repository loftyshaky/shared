declare const globalThis: Global;

declare global {
    const is_ext: boolean;
    const page: string;
    const misplaced_dependency: (culprit_page: string) => void;
}

globalThis.is_ext =
    typeof browser !== 'undefined' ||
    (typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined');

export {}; // need to be here, otherwise there will be error in this file
