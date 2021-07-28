import { t } from 'shared/internal';

export class Link {
    public name: string;
    public type?: string = 'link';
    public browser?: t.Browser;
    public href?: string;
    public force_resolve?: boolean = false;

    public constructor(obj: Link) {
        Object.assign(this, obj);
        this.name = obj.name;
    }

    public text? = (): string =>
        err(() => {
            const text: string =
                ext.msg(`${this.name}_link_text`) ||
                ext.msg(`${this.name}_${this.browser}_link_text`);

            return text;
        }, 'shr_1069');

    public href_final? = (): string =>
        err(() => {
            const href: string | undefined = n(this.href)
                ? this.href
                : ext.msg(`${this.name}_link_href`) ||
                  ext.msg(`${this.name}_${this.browser}_link_href`);

            return href;
        }, 'shr_1070');

    public show_link? = (): boolean =>
        err(() => {
            const link_is_cross_browser: boolean = !n(this.browser);
            const link_browser_is_the_same_as_env_browser: boolean = this.browser === env.browser;

            return (
                link_is_cross_browser ||
                !link_browser_is_the_same_as_env_browser ||
                (n(this.force_resolve) && this.force_resolve)
            );
        }, 'shr_1071');
}
