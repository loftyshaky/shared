import { t } from 'shared/internal';

export class Link {
    public name: string;
    public name_clean?: string;
    public type?: string = 'link';
    public label_type?: 'text' | 'svg' = 'text';
    public browser?: t.Browser;
    public href?: string;
    public Svg?: string = '';
    public target?: string = '_blank';
    public alt_msg?: string;
    public force_resolve?: boolean = false;

    public constructor(obj: Link) {
        Object.assign(this, obj);
        this.name = obj.name;
        this.name_clean = obj.name.replace(/i\d+i/, '');
    }

    public text? = (): string =>
        err(() => {
            const text: string =
                ext.msg(`${this.name_clean}_link_text`) ||
                ext.msg(`${this.name_clean}_${this.browser}_link_text`);

            return text;
        }, 'shr_1069');

    public href_final? = (): string =>
        err(() => {
            const href: string | undefined = n(this.href)
                ? this.href
                : ext.msg(`${this.name_clean}_link_href`) ||
                  ext.msg(`${this.name_clean}_${this.browser}_link_href`) ||
                  ext.msg(`offer_${this.name_clean}_${this.browser}_link_href`);

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
