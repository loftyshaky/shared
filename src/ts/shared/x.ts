import _ from 'lodash';
import { browser } from 'webextension-polyfill-ts';

import { t } from 'shared/internal';

declare const global: Global;

declare global {
    const env: {
        browser: t.Browser
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
        selector: string
    ): NodeListOf<T1> | undefined;
}

// eslint-disable-next-line no-console
global.l = console.log.bind(console);

// > undefined/null check
global.n = <T1>(val: T1 | undefined | null): val is T1 => ( // not nil (nil is undefined or null)
    val != null
);

global.nn = <T1>(val: T1 | null): val is T1 => ( // not null
    val !== null
);

global.ru = (f: t.CallbackVariadicAny | undefined): any => ( // resolve undefined
    n(f)
        ? f()
        : undefined
);

global.rb = (f: t.CallbackVariadicAny | undefined): any => ( // resolve boolean
    n(f)
        ? f()
        : false
);

global.rs = (f: t.CallbackVariadicAny | undefined): any => ( // resolve string
    n(f)
        ? f()
        : ''
);
// < undefined/null check

const shared: any = {
    ensure_els: <T1 extends HTMLElement>(
        els: T1 | undefined,
    ): T1 | NodeListOf<T1> | undefined => {
        if (n(els)) {
            return els;
        }

        return undefined;
    },
};

// > selecting elements
global.s = <T1>(selector: string): T1 | undefined => (
    shared.ensure_els(document.querySelector(selector))
);

global.sa = <T1 extends HTMLElement>(selector: string): NodeListOf<T1> | undefined => (
    shared.ensure_els(document.querySelectorAll(selector))
);

global.sb = <T1>(
    base_el: t.BaseEl,
    selector: string,
): T1 | undefined => {
    if (n(base_el)) {
        return shared.ensure_els(base_el.querySelector(selector));
    }

    return undefined;
};

global.sab = <T1 extends HTMLElement>(
    base_el: t.BaseEl,
    selector: string,
): NodeListOf<T1> | undefined => {
    const els: NodeListOf<T1> | undefined = n(base_el)
        ? base_el.querySelectorAll(selector)
        : undefined;

    return shared.ensure_els(els);
};
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
        els: Window | Document | HTMLElement[] | NodeList | HTMLElement | undefined,
        callback: t.CallbackVariadicVoid,
    ): void => {
        if (n(els)) {
            if (
                els instanceof NodeList
                || (els as any).length > 1
            ) {
                Array.from(els as any).forEach((el): void => {
                    callback(el);
                });
            } else if (els instanceof HTMLElement) {
                callback(els);
            }
        }
    };

    // > dom manipulation
    public create = <T1 extends keyof HTMLElementTagNameMap>(
        el_type: T1,
        cls: string,
    ): HTMLElementTagNameMap[T1] => {
        const el: HTMLElementTagNameMap[T1] = document.createElement(el_type);
        el.className = cls;

        return el;
    };

    public append = (
        el: HTMLElement | ShadowRoot | undefined | null,
        child: HTMLElement,
    ): void => {
        if (
            n(el)
            && [
                1,
                11,
            ].includes(el.nodeType)
        ) {
            el.appendChild(child);
        }
    };

    public remove = (els: HTMLElement[] | NodeList | HTMLElement | undefined): void => {
        const remove_one_el = (el: HTMLElement): void => {
            if (
                n(el)
                && n(el.parentNode)
                && el.nodeType === 1
            ) {
                el.parentNode.removeChild(el);
            }
        };

        this.all(
            els,
            remove_one_el,
        );
    };

    public before = (
        el_to_insert_before: HTMLElement | undefined,
        el_to_insert: HTMLElement | ShadowRoot | undefined | null,
    ): void => {
        if (
            n(el_to_insert_before)
            && n(el_to_insert)
            && n(el_to_insert_before.parentNode)
            && [
                1,
                11,
            ].includes(el_to_insert.nodeType)
        ) {
            el_to_insert_before.parentNode.insertBefore(
                el_to_insert,
                el_to_insert_before,
            );
        }
    };

    public after = (
        el_to_insert_after: HTMLElement | undefined,
        el_to_insert: HTMLElement | ShadowRoot | undefined | null,
    ): void => {
        if (
            n(el_to_insert_after)
            && n(el_to_insert)
            && n(el_to_insert_after.parentNode)
            && [
                1,
                11,
            ].includes(el_to_insert.nodeType)
        ) {
            el_to_insert_after.parentNode.insertBefore(
                el_to_insert,
                el_to_insert_after.nextElementSibling,
            );
        }
    };

    public as_first = (
        parent: HTMLElement | ShadowRoot | undefined | null,
        child: HTMLElement | undefined,
    ): void => {
        if (
            n(parent)
            && n(child)
            && n(parent.parentNode)
            && [
                1,
                11,
            ].includes(parent.nodeType)
        ) {
            parent.insertBefore(
                child,
                parent.firstElementChild,
            );
        }
    };
    // < dom manipulation

    public matches = (
        el: HTMLElement | undefined,
        selector: string,
    ): boolean => {
        if (
            n(el)
            && el.nodeType === 1) {
            return el.matches(selector);
        }

        return false;
    };

    public closest = <T1>(
        el: HTMLElement | undefined,
        selector: string,
    ): T1 | undefined => {
        if (
            n(el)
            && el.nodeType === 1
        ) {
            return shared.ensure_els(el.closest(selector));
        }

        return undefined;
    };

    public add_cls = (
        el: HTMLElement | undefined,
        cls: string,
    ): void => {
        if (
            n(el)
            && el.nodeType === 1
        ) {
            el.classList.add(cls);
        }
    };

    public remove_cls = (
        els: HTMLElement[] | NodeList | HTMLElement | undefined,
        cls: string,
    ): void => {
        const remove_cls_one = (el: HTMLElement): void => {
            if (
                n(el)
                && el.nodeType === 1
            ) {
                el.classList.remove(cls);
            }
        };

        this.all(
            els,
            remove_cls_one,
        );
    };

    // > array
    public move_item = (
        from: number,
        to: number,
        arr: any[],
    ): void => {
        arr.splice(
            to,
            0,
            arr.splice(
                from,
                1,
            )[0],
        );
    };

    public remove_item = (
        i: number, arr: any[],
    ): void => {
        arr.splice(
            i,
            1,
        );
    };
    // < array

    // > add event listener to one or multiple elements t
    public bind = (
        els: Window | Document | HTMLElement[] | NodeList | HTMLElement | undefined,
        event: string,
        f: t.CallbackVariadicVoid,
    ): void => {
        this.all(
            els,
            (el: Window | Document | HTMLElement) => {
                el.addEventListener(
                    event,
                    f,
                );
            },
        );
    };
    // < add event listener to one or multiple elements t

    public css = (
        filename: string,
        parent: HTMLHeadElement | ShadowRoot | undefined,
        cls?: string,
    ): HTMLLinkElement | undefined => {
        if (n(parent)) {
            const cls_final: string = cls || `${filename}_link`;

            const new_link = this.create(
                'link',
                cls_final,
            );

            this.bind(
                new_link,
                'load',
                (): void => {
                    const old_links = sab<HTMLLinkElement>(
                        parent,
                        `.${cls_final}`,
                    );
                    if (n(old_links)) {
                        const old_links_arr = [...old_links];

                        if (old_links_arr.length > 1) {
                            old_links_arr.pop();

                            old_links_arr.forEach((old_link): void => {
                                this.remove(old_link);
                            });
                        }
                    }
                },
            );

            new_link.href = browser.runtime.getURL(`${filename}.css`);
            new_link.setAttribute(
                'rel',
                'stylesheet',
            );
            new_link.setAttribute(
                'type',
                'text/css',
            );
            parent.appendChild(new_link);

            return new_link;
        }

        return undefined;
    };

    public dynamic_css = (
        parent: HTMLHeadElement | ShadowRoot,
        cls: string,
        css: string,
    ): HTMLStyleElement => {
        const cls_final = `${cls}_style`;
        const old_style = sb<HTMLStyleElement>(
            parent,
            `.${cls_final}`,
        );

        if (n(old_style)) { this.remove(old_style); }

        const new_style = this.create(
            'style',
            cls_final,
        );
        new_style.innerHTML = css;
        parent.appendChild(new_style);

        return new_style;
    };

    public get_css_val = (
        el: HTMLElement,
        key: string,
    ): string => (
        window.getComputedStyle(el).getPropertyValue(key)
    );

    public get_numeric_css_val = (
        el: HTMLElement,
        key: string,
    ): number => (
        parseInt(
            window.getComputedStyle(el).getPropertyValue(key),
            10,
        )
    );

    public get_float_css_val = (
        el: HTMLElement,
        key: string,
    ): number => (
        parseFloat(window.getComputedStyle(el).getPropertyValue(key))
    );

    public str_is_number = (val: string): boolean => (
        /^\d+$|^\d+\.\d+$/.test(val)
    );

    public delay = (delay: number): Promise<void> => (
        new Promise((resolve): number => (
            window.setTimeout(
                (): void => resolve(),
                delay,
            )))
    );

    public id = (): string => {
        const uint32 = global.crypto.getRandomValues(new Uint32Array(1))[0];

        return Array.from(uint32.toString(16)).map((char: string): string => (
            this.rand_bool()
                ? char.toUpperCase()
                : char
        )).join('');
    };

    public range = (
        min: number,
        max: number,
    ): number => (
        Math.floor(Math.random() * (max - min + 1)) + min
    );

    public rand_bool = (): boolean => (
        !Math.round(Math.random())
    );

    public cls = (classes: (string | undefined)[]): string => (
        _.reject(
            classes,
            (item: string | undefined): boolean => !n(item) || item === '',
        ).join(' ')
    )

    public get_prop = <T1, T2 extends keyof T1>(
        obj: T1,
        key: T2,
    ): T1[T2] => (
        obj[key]
    )

    public set_prop = <T1, T2 extends keyof T1>(
        obj: T1,
        key: T2,
        val: T1[T2],
    ): T1 => {
        const updated_obj: T1 = obj;

        updated_obj[key] = val;

        return updated_obj;
    };

    public sanitize_filename = (
        filename: string,
        new_character: string = '_',
    ): string => (
        filename.replace(
            /[<>:"/\\|?]/g,
            new_character,
        )
    )
}
