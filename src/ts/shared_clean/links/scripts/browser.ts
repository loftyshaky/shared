import type { i_links } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public new_tab: i_links.Browser = {
        chrome: 'chrome://new-tab-page/',
        edge: 'https://ntp.msn.com/edge/ntp/',
        opera: 'chrome://startpageshared/',
        brave: 'brave://newtab',
        yandex: 'about:blank',
        firefox: 'about:blank',
    };
}

export const Browser = Class.get_instance();
