import _ from 'lodash';

import { t } from 'shared/internal';

declare const globalThis: Global & Window;

declare global {
    const env: t.Env;
    const l: CallableFunction;
    function n<T1>(val: T1 | undefined | null): val is T1;
    function nn<T1>(val: T1 | null): val is T1;
    function rs(variable: t.CallbackVariadicString | string | undefined): string;
    function rn(variable: t.CallbackVariadicNumber | number | undefined): number;
    function rb(variable: t.CallbackVariadicBoolean | boolean | undefined): boolean;
    function ru(variable: t.CallbackVariadicUndefined): undefined;
    function s<T1>(selector: string): T1 | undefined;
    function sa<T1 extends HTMLElement>(selector: string): NodeListOf<T1> | undefined;
    function sb<T1>(base_el: t.BaseEl, selector: string): T1 | undefined;
    function sab<T1 extends HTMLElement>(
        base_el: t.BaseEl,
        selector: string,
    ): NodeListOf<T1> | undefined;
}

// eslint-disable-next-line no-console
globalThis.l = console.log.bind(console);

// > undefined/null check
globalThis.n = <T1>(val: T1 | undefined | null): val is T1 => err(() => val != null, 'shr_1140'); // not nil (nil is undefined or null)

globalThis.nn = <T1>(val: T1 | null): val is T1 => err(() => val !== null, 'shr_1141'); // not null

globalThis.rs = (variable: t.CallbackVariadicString | string | undefined): string =>
    err(() => (n(variable) ? shared.resolve_variable(variable) : ''), 'shr_1142'); // resolve string

globalThis.rn = (variable: t.CallbackVariadicNumber | number | undefined): number =>
    err(() => (n(variable) ? shared.resolve_variable(variable) : Infinity), 'shr_1143'); // resolve number

globalThis.rb = (variable: t.CallbackVariadicBoolean | boolean | undefined): boolean =>
    err(() => (n(variable) ? shared.resolve_variable(variable) : false), 'shr_1144'); // resolve boolean

globalThis.ru = (variable: t.CallbackVariadicUndefined | undefined): undefined =>
    err(() => (n(variable) ? shared.resolve_variable(variable) : undefined), 'shr_1145'); // resolve undefined
// < undefined/null check

const shared: t.AnyRecord = {
    ensure_els: <T1 extends HTMLElement>(els: T1 | undefined): T1 | NodeListOf<T1> | undefined =>
        err(() => {
            if (n(els)) {
                return els;
            }

            return undefined;
        }, 'shr_1146'),

    resolve_variable: (variable: t.CallbackVariadicAny | t.AnyUndefined): t.AnyUndefined =>
        err(() => {
            if (typeof variable === 'function') {
                return variable();
            }

            return variable;
        }, 'shr_1147'),
};

// > selecting elements
globalThis.s = <T1>(selector: string): T1 | undefined =>
    err(() => shared.ensure_els(document.querySelector(selector)), 'shr_1148');

globalThis.sa = <T1 extends HTMLElement>(selector: string): NodeListOf<T1> | undefined =>
    err(() => shared.ensure_els(document.querySelectorAll(selector)), 'shr_1149');

globalThis.sb = <T1>(base_el: t.BaseEl, selector: string): T1 | undefined =>
    err(() => {
        if (n(base_el)) {
            return shared.ensure_els(base_el.querySelector(selector));
        }

        return undefined;
    }, 'shr_1150');

globalThis.sab = <T1 extends HTMLElement>(
    base_el: t.BaseEl,
    selector: string,
): NodeListOf<T1> | undefined =>
    err(() => {
        const els: NodeListOf<T1> | undefined = n(base_el)
            ? base_el.querySelectorAll(selector)
            : undefined;

        return shared.ensure_els(els);
    }, 'shr_1151');
// > selecting elements

export class X {
    private static i0: X;

    public static i(): X {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public in_service_worker: boolean = typeof document === 'undefined';
    public invisible_chars: string = '\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b';
    private manifest: t.StringRecord = {};

    // el.nodeType === 1 = not document

    public get_asset_path = async (): Promise<void> => {
        if (env.env === 'adonis_app') {
            const manifest_path: string = `${globalThis.location.origin}/assets/manifest.json`;

            const response = await fetch(manifest_path);
            const manifest = await response.json();

            this.manifest = manifest;
        }
    };

    private all = (
        els: Window | Document | ShadowRoot | null | t.XEls,
        callback: t.CallbackVariadicVoid,
    ): void =>
        err(() => {
            if (n(els)) {
                if (
                    !(els instanceof Window) &&
                    (els instanceof NodeList || (els as HTMLElement[]).length > 1)
                ) {
                    Array.from(els as HTMLElement[]).forEach((el): void => {
                        callback(el);
                    });
                } else {
                    callback(els);
                }
            }
        }, 'shr_1152');

    // > dom manipulation
    public create = <T1 extends keyof HTMLElementTagNameMap>(
        el_type: T1,
        cls: string,
    ): HTMLElementTagNameMap[T1] =>
        err(() => {
            const el: HTMLElementTagNameMap[T1] = document.createElement(el_type);
            el.className = cls;

            return el;
        }, 'shr_1153');

    public append = (parent: t.XEl, child: t.XElNoShadow): void =>
        err(() => {
            if (n(parent) && n(child) && [1, 11].includes(parent.nodeType)) {
                parent.appendChild(child);
            }
        }, 'shr_1154');

    public as_first = (parent: t.XEl, child: t.XElNoShadow): void =>
        err(() => {
            if (
                n(parent) &&
                n(child) &&
                n(parent.parentNode) &&
                [1, 11].includes(parent.nodeType)
            ) {
                parent.insertBefore(child, parent.firstChild);
            }
        }, 'shr_1155');

    public before = (el_to_insert_before: t.XElNoShadow, child: t.XEl): void =>
        err(() => {
            if (
                n(el_to_insert_before) &&
                n(child) &&
                n(el_to_insert_before.parentNode) &&
                [1, 11].includes(child.nodeType)
            ) {
                el_to_insert_before.before(child);
            }
        }, 'shr_1156');

    public after = (el_to_insert_after: t.XElNoShadow, child: t.XEl): void =>
        err(() => {
            if (
                n(el_to_insert_after) &&
                n(child) &&
                n(el_to_insert_after.parentNode) &&
                [1, 11].includes(child.nodeType)
            ) {
                el_to_insert_after.after(child);
            }
        }, 'shr_1157');

    public remove = (els: t.XEls): void =>
        err(() => {
            const one = (el: HTMLElement): void =>
                err(() => {
                    if (n(el) && n(el.parentNode) && el.nodeType === 1) {
                        el.parentNode.removeChild(el);
                    }
                }, 'shr_1158');

            this.all(els, one);
        }, 'shr_1159');
    // < dom manipulation

    public matches = (el: HTMLElement | undefined, selector: string): boolean =>
        err(() => {
            if (n(el) && el.nodeType === 1) {
                return el.matches(selector);
            }

            return false;
        }, 'shr_1160');

    public closest = <T1>(el: HTMLElement | undefined, selector: string): T1 | undefined =>
        err(() => {
            if (n(el) && el.nodeType === 1) {
                return shared.ensure_els(el.closest(selector));
            }

            return undefined;
        }, 'shr_1161');

    public add_cls = (els: t.XEls, cls: string): void =>
        err(() => {
            const one = (el: HTMLElement): void =>
                err(() => {
                    if (n(el) && el.nodeType === 1) {
                        el.classList.add(cls);
                    }
                }, 'shr_1162');

            this.all(els, one);
        }, 'shr_1163');

    public remove_cls = (els: t.XEls, cls: string): void =>
        err(() => {
            const one = (el: HTMLElement): void =>
                err(() => {
                    if (n(el) && el.nodeType === 1) {
                        el.classList.remove(cls);
                    }
                }, 'shr_1164');

            this.all(els, one);
        }, 'shr_1165');

    // > array
    public move_item = (from: number, to: number, arr: t.AnyArray): void =>
        err(() => {
            arr.splice(to, 0, arr.splice(from, 1)[0] as t.AnyArray);
        }, 'shr_1166');

    public insert_item = (position: number, items: t.AnyArray, arr: t.AnyArray): any[] =>
        err(() => [...arr.slice(0, position), ...items, ...arr.slice(position)], 'shr_1216');

    public remove_item = (i: number, arr: t.AnyArray): void =>
        err(() => {
            arr.splice(i, 1);
        }, 'shr_1167');
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
                }, 'shr_1168');

            this.all(els, one);
        }, 'shr_1169');
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
                const app_filename: string =
                    env.env === 'adonis_app'
                        ? this.manifest[`assets/${filename}.css`]
                        : `${filename}.css`;

                new_link.href = is_ext ? we.runtime.getURL(`${filename}.css`) : `${app_filename}`;
                new_link.setAttribute('rel', 'stylesheet');
                new_link.setAttribute('type', 'text/css');
                parent.appendChild(new_link);

                return new_link;
            }

            return undefined;
        }, 'shr_1170');

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
            if (n(parent)) {
                parent.appendChild(new_style);
            }

            return new_style;
        }, 'shr_1171');

    public get_css_val = (el: HTMLElement, key: string): string =>
        err(() => globalThis.getComputedStyle(el).getPropertyValue(key), 'shr_1172');

    public get_numeric_css_val = (el: HTMLElement, key: string): number =>
        err(() => parseInt(globalThis.getComputedStyle(el).getPropertyValue(key), 10), 'shr_1173');

    public get_float_css_val = (el: HTMLElement, key: string): number =>
        err(() => parseFloat(globalThis.getComputedStyle(el).getPropertyValue(key)), 'shr_1174');

    public str_is_number = (val: string): boolean =>
        err(() => /^\d+$|^\d+\.\d+$/.test(val), 'shr_1175');

    public delay = (delay: number): Promise<void> =>
        new Promise((resolve): void => {
            err(() => {
                globalThis.setTimeout((): void => {
                    resolve();
                }, delay);
            }, 'shr_1176');
        });

    public id = (): string =>
        err(() => {
            const crypto: Crypto = n(globalThis.crypto)
                ? globalThis.crypto
                : // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
                  require('crypto').webcrypto;
            const uint32 = crypto.getRandomValues(new Uint32Array(1))[0];

            return Array.from(uint32.toString(16))
                .map((char: string): string => (this.rand_bool() ? char.toUpperCase() : char))
                .join('');
        }, 'shr_1177');

    public unique_id = (): string => err(() => new Date().getTime() + this.id(), 'shr_1215');

    public range = (min: number, max: number): number =>
        err(() => Math.floor(Math.random() * (max - min + 1)) + min, 'shr_1178');

    public rand_bool = (): boolean => err(() => !Math.round(Math.random()), 'shr_1179');

    public convert_string_bool = (bool: string): boolean => err(() => bool === 'true', 'shr_1194');

    public range_arr = (end: number, start: number = 0): number[] =>
        err(() => {
            const arr = [];

            for (let i = start; i <= end; i += 1) {
                arr.push(i);
            }

            return arr;
        }, 'shr_1217');

    public cls = (classes: (string | undefined)[]): string =>
        err(
            () =>
                _.reject(
                    classes,
                    (item: string | undefined): boolean => !n(item) || item === '',
                ).join(' '),
            'shr_1180',
        );

    public get_prop = <T1, T2 extends keyof T1>(obj: T1, key: T2): T1[T2] =>
        err(() => obj[key], 'shr_1181');

    public set_prop = <T1, T2 extends keyof T1>(obj: T1, key: T2, val: T1[T2]): T1 =>
        err(() => {
            const updated_obj: T1 = obj;

            updated_obj[key] = val;

            return updated_obj;
        }, 'shr_1182');

    public sanitize_filename = (filename: string, new_character: string = '_'): string =>
        err(() => filename.replace(/[<>:"/\\|?]/g, new_character), 'shr_1183');

    public convert_blob_to_base64 = (blob: Blob): Promise<string> =>
        new Promise((resolve, reject) => {
            err(() => {
                const reader = new FileReader();
                reader.onerror = reject;
                reader.onload = () => {
                    resolve(reader.result as string);
                };
                reader.readAsDataURL(blob);
            }, 'shr_1184');
        });

    public convert_base64_to_blob = (base64: string): Promise<Blob> =>
        err_async(async () => {
            const response = await fetch(base64);

            const blob: Blob = await response.blob();

            return blob;
        }, 'shr_1225');

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
        }, 'shr_1185');

    public copy_img = (img_url: string): void =>
        err(() => {
            const selection = globalThis.getSelection();

            if (n(selection)) {
                selection.removeAllRanges();

                const img = this.create('img', '');

                img.style.position = 'fixed';
                img.style.opacity = '0';
                img.src = img_url;

                this.append(document.body, img);

                const range = document.createRange();

                range.setStartBefore(img);
                range.setEndAfter(img);
                range.selectNode(img);

                selection.addRange(range);

                document.execCommand('Copy');

                this.remove(img);
            }
        }, 'shr_1186');

    public px = (val: string | number | undefined): string => err(() => `${val}px`, 'shr_1187');

    public insert_invisible_chars_in_title = (): void =>
        err(() => {
            document.title += this.invisible_chars;
        }, 'shr_1188');

    public async_debounce<F extends (...args: any[]) => Promise<any>>(f: F, wait?: number) {
        const debounced = _.debounce((resolve, reject, args: Parameters<F>) => {
            f(...args)
                .then(resolve)
                .catch(reject);
        }, wait);

        return (...args: Parameters<F>): ReturnType<F> =>
            new Promise((resolve, reject) => {
                debounced(resolve, reject, args);
            }) as ReturnType<F>;
    }
}
