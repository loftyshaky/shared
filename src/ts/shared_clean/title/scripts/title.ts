import { s_env } from 'shared_clean/internal';
import type { t } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public get = (): string =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el) && n(title_el.textContent)) {
                return title_el.textContent;
            }

            return '';
        }, 'shr_1230');

    public set = (): void =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el)) {
                const title = (globalThis as t.AnyRecord)[s_env.Env.type()].msg(
                    `${page}_title_text`,
                );

                title_el.textContent =
                    page === 'announcement' ? `${we.runtime.getManifest().name} - ${title}` : title;
            }
        }, 'shr_1229');
}

export const Title = Class.get_instance();
