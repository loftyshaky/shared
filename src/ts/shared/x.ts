import _ from 'lodash';
import { browser } from 'webextension-polyfill-ts';

import { t } from 'shared/internal';

declare const global: Global;

declare global {
    const env: {
        browser: t.Browser;
    };
    const l: any;
    function n<T1>(val: T1 | undefined | null): val is T1;
    function nn<T1>(val: T1 | null): val is T1;
    function ru(f: t.CallbackVariadicAny | undefined): any;
    function rb(f: t.CallbackVariadicAny | undefined): any;
    function rs(f: t.CallbackVariadicAny | undefined): any;
    function s<T1>(selector: string): T1 | undefined;
    function sa<T1 extends HTMLElement>(selector: string): NodeListOf<T1> | undefined;
    function sb<T1>(base_el: t.BaseEl, selector: string): T1 | undefined;
    function sab<T1 extends HTMLElement>(
        base_el: t.BaseEl,
        selector: string,
    ): NodeListOf<T1> | undefined;
}

// eslint-disable-next-line no-console
global.l = console.log.bind(console);

// > undefined/null check
global.n = <T1>(val: T1 | undefined | null): val is T1 => err(() => val != null, 'shr_1078'); // not nil (nil is undefined or null)

global.nn = <T1>(val: T1 | null): val is T1 => err(() => val !== null, 'shr_1079'); // not null

global.ru = (f: t.CallbackVariadicAny | undefined): any =>
    err(() => (n(f) ? f() : undefined), 'shr_1080'); // resolve undefined

global.rb = (f: t.CallbackVariadicAny | undefined): any =>
    err(() => (n(f) ? f() : false), 'shr_1081'); // resolve boolean

global.rs = (f: t.CallbackVariadicAny | undefined): any => err(() => (n(f) ? f() : ''), 'shr_1082'); // resolve string
// < undefined/null check

const shared: any = {
    ensure_els: <T1 extends HTMLElement>(els: T1 | undefined): T1 | NodeListOf<T1> | undefined =>
        err(() => {
            if (n(els)) {
                return els;
            }

            return undefined;
        }, 'shr_1083'),
};

// > selecting elements
global.s = <T1>(selector: string): T1 | undefined =>
    err(() => shared.ensure_els(document.querySelector(selector)), 'shr_1084');

global.sa = <T1 extends HTMLElement>(selector: string): NodeListOf<T1> | undefined =>
    err(() => shared.ensure_els(document.querySelectorAll(selector)), 'shr_1085');

global.sb = <T1>(base_el: t.BaseEl, selector: string): T1 | undefined =>
    err(() => {
        if (n(base_el)) {
            return shared.ensure_els(base_el.querySelector(selector));
        }

        return undefined;
    }, 'shr_1086');

global.sab = <T1 extends HTMLElement>(
    base_el: t.BaseEl,
    selector: string,
): NodeListOf<T1> | undefined =>
    err(() => {
        const els: NodeListOf<T1> | undefined = n(base_el)
            ? base_el.querySelectorAll(selector)
            : undefined;

        return shared.ensure_els(els);
    }, 'shr_1087');
// > selecting elements

export class X {
    private static i0: X;

    public static i(): X {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    // el.nodeType === 1 = not document

    private all = (
        els: Window | Document | ShadowRoot | null | t.XEls,
        callback: t.CallbackVariadicVoid,
    ): void =>
        err(() => {
            if (n(els)) {
                if (els instanceof NodeList || (els as any).length > 1) {
                    Array.from(els as any).forEach((el): void => {
                        callback(el);
                    });
                } else {
                    callback(els);
                }
            }
        }, 'shr_1088');

    // > dom manipulation
    public create = <T1 extends keyof HTMLElementTagNameMap>(
        el_type: T1,
        cls: string,
    ): HTMLElementTagNameMap[T1] =>
        err(() => {
            const el: HTMLElementTagNameMap[T1] = document.createElement(el_type);
            el.className = cls;

            return el;
        }, 'shr_1089');

    public append = (parent: t.XEl, child: HTMLElement): void =>
        err(() => {
            if (n(parent) && [1, 11].includes(parent.nodeType)) {
                parent.appendChild(child);
            }
        }, 'shr_1090');

    public as_first = (parent: t.XEl, child: HTMLElement | undefined): void =>
        err(() => {
            if (
                n(parent) &&
                n(child) &&
                n(parent.parentNode) &&
                [1, 11].includes(parent.nodeType)
            ) {
                parent.insertBefore(child, parent.firstElementChild);
            }
        }, 'shr_1094');

    public before = (el_to_insert_before: HTMLElement | undefined, child: t.XEl): void =>
        err(() => {
            if (
                n(el_to_insert_before) &&
                n(child) &&
                n(el_to_insert_before.parentNode) &&
                [1, 11].includes(child.nodeType)
            ) {
                el_to_insert_before.parentNode.insertBefore(child, el_to_insert_before);
            }
        }, 'shr_1092');

    public after = (el_to_insert_after: HTMLElement | undefined, child: t.XEl): void =>
        err(() => {
            if (
                n(el_to_insert_after) &&
                n(child) &&
                n(el_to_insert_after.parentNode) &&
                [1, 11].includes(child.nodeType)
            ) {
                el_to_insert_after.parentNode.insertBefore(
                    child,
                    el_to_insert_after.nextElementSibling,
                );
            }
        }, 'shr_1093');

    public remove = (els: t.XEls): void =>
        err(() => {
            const one = (el: HTMLElement): void =>
                err(() => {
                    if (n(el) && n(el.parentNode) && el.nodeType === 1) {
                        el.parentNode.removeChild(el);
                    }
                }, 'shr_1162');

            this.all(els, one);
        }, 'shr_1091');
    // < dom manipulation

    public matches = (el: HTMLElement | undefined, selector: string): boolean =>
        err(() => {
            if (n(el) && el.nodeType === 1) {
                return el.matches(selector);
            }

            return false;
        }, 'shr_1095');

    public closest = <T1>(el: HTMLElement | undefined, selector: string): T1 | undefined =>
        err(() => {
            if (n(el) && el.nodeType === 1) {
                return shared.ensure_els(el.closest(selector));
            }

            return undefined;
        }, 'shr_1096');

    public add_cls = (els: t.XEls, cls: string): void =>
        err(() => {
            const one = (el: HTMLElement): void =>
                err(() => {
                    if (n(el) && el.nodeType === 1) {
                        el.classList.add(cls);
                    }
                }, 'shr_1167');

            this.all(els, one);
        }, 'shr_1097');

    public remove_cls = (els: t.XEls, cls: string): void =>
        err(() => {
            const one = (el: HTMLElement): void =>
                err(() => {
                    if (n(el) && el.nodeType === 1) {
                        el.classList.remove(cls);
                    }
                }, 'shr_1168');

            this.all(els, one);
        }, 'shr_1098');

    // > array
    public move_item = (from: number, to: number, arr: any[]): void =>
        err(() => {
            arr.splice(to, 0, arr.splice(from, 1)[0]);
        }, 'shr_1099');

    public remove_item = (i: number, arr: any[]): void =>
        err(() => {
            arr.splice(i, 1);
        }, 'shr_1100');
    // < array

    // > add event listener to one or multiple elements t
    public bind = (
        els: Window | Document | t.XEls,
        event: string,
        f: t.CallbackVariadicVoid,
    ): void =>
        err(() => {
            const one = (el: HTMLElement): void =>
                err(() => {
                    if (n(el.addEventListener)) {
                        el.addEventListener(event, f);
                    }
                }, 'shr_1164');

            this.all(els, one);
        }, 'shr_1101');
    // < add event listener to one or multiple elements t

    public css = (
        filename: string,
        parent: HTMLHeadElement | ShadowRoot | undefined,
        cls?: string,
    ): HTMLLinkElement | undefined =>
        err(() => {
            if (n(parent)) {
                const cls_final: string = cls || `${filename}_link`;

                const new_link = this.create('link', cls_final);

                this.bind(new_link, 'load', (): void => {
                    const old_links = sab<HTMLLinkElement>(parent, `.${cls_final}`);
                    if (n(old_links)) {
                        const old_links_arr = [...old_links];

                        if (old_links_arr.length > 1) {
                            old_links_arr.pop();

                            old_links_arr.forEach((old_link): void => {
                                this.remove(old_link);
                            });
                        }
                    }
                });

                new_link.href = browser.runtime.getURL(`${filename}.css`);
                new_link.setAttribute('rel', 'stylesheet');
                new_link.setAttribute('type', 'text/css');
                parent.appendChild(new_link);

                return new_link;
            }

            return undefined;
        }, 'shr_1102');

    public dynamic_css = (
        parent: HTMLHeadElement | ShadowRoot,
        cls: string,
        css: string,
    ): HTMLStyleElement =>
        err(() => {
            const cls_final = `${cls}_style`;
            const old_style = sb<HTMLStyleElement>(parent, `.${cls_final}`);

            if (n(old_style)) {
                this.remove(old_style);
            }

            const new_style = this.create('style', cls_final);
            new_style.innerHTML = css;
            parent.appendChild(new_style);

            return new_style;
        }, 'shr_1103');

    public get_css_val = (el: HTMLElement, key: string): string =>
        err(() => window.getComputedStyle(el).getPropertyValue(key), 'shr_1088');

    public get_numeric_css_val = (el: HTMLElement, key: string): number =>
        err(() => parseInt(window.getComputedStyle(el).getPropertyValue(key), 10), 'shr_1088');

    public get_float_css_val = (el: HTMLElement, key: string): number =>
        err(() => parseFloat(window.getComputedStyle(el).getPropertyValue(key)), 'shr_1088');

    public str_is_number = (val: string): boolean =>
        err(() => /^\d+$|^\d+\.\d+$/.test(val), 'shr_1088');

    public delay = (delay: number): Promise<void> =>
        new Promise((resolve): number =>
            err(
                () =>
                    window.setTimeout((): void => {
                        resolve();
                    }, delay),
                'shr_1104',
            ),
        );

    public id = (): string =>
        err(() => {
            const uint32 = global.crypto.getRandomValues(new Uint32Array(1))[0];

            return Array.from(uint32.toString(16))
                .map((char: string): string => (this.rand_bool() ? char.toUpperCase() : char))
                .join('');
        }, 'shr_1105');

    public range = (min: number, max: number): number =>
        err(() => Math.floor(Math.random() * (max - min + 1)) + min, 'shr_1088');

    public rand_bool = (): boolean => err(() => !Math.round(Math.random()), 'shr_1088');

    public cls = (classes: (string | undefined)[]): string =>
        err(
            () =>
                _.reject(
                    classes,
                    (item: string | undefined): boolean => !n(item) || item === '',
                ).join(' '),
            'shr_1106',
        );

    public get_prop = <T1, T2 extends keyof T1>(obj: T1, key: T2): T1[T2] =>
        err(() => obj[key], 'shr_1088');

    public set_prop = <T1, T2 extends keyof T1>(obj: T1, key: T2, val: T1[T2]): T1 =>
        err(() => {
            const updated_obj: T1 = obj;

            updated_obj[key] = val;

            return updated_obj;
        }, 'shr_1107');

    public sanitize_filename = (filename: string, new_character: string = '_'): string =>
        err(() => filename.replace(/[<>:"/\\|?]/g, new_character), 'shr_1088');

    public convert_blob_to_base64 = (blob: Blob): Promise<string> =>
        new Promise((resolve, reject) => {
            err(() => {
                const reader: any = new FileReader();
                reader.onerror = reject;
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(blob);
            }, 'shr_1108');
        });

    public copy_text = (text: string): void =>
        err(() => {
            const input = this.create('input', '');

            input.style.position = 'fixed';
            input.style.opacity = '0';

            this.append(document.body, input);

            input.value = text;

            input.focus();
            input.select();

            document.execCommand('copy');

            this.remove(input);
        }, 'shr_1109');

    public copy_img = (img_url: string): void =>
        err(() => {
            const selection: any = window.getSelection();

            selection.removeAllRanges();

            const img = this.create('img', '');

            img.style.position = 'fixed';
            img.style.opacity = '0';
            img.src = img_url;

            this.append(document.body, img);

            const range: any = document.createRange();

            range.setStartBefore(img);
            range.setEndAfter(img);
            range.selectNode(img);

            selection.addRange(range);

            document.execCommand('Copy');

            this.remove(img);
        }, 'shr_1110');

    public px = (val: string | number | undefined): string => err(() => `${val}px`, 'shr_1169');
}
