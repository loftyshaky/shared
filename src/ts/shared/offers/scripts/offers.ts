import { o_offers } from 'shared/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    private enable_offers: boolean = true;

    private clear_new_tab: string[] = [
        'nnmhbhoglljdlhbllfgkemgenlplalie',
        'felphkbfjadmcejnibcmcncimlappdde',
    ];

    public offers: o_offers.Offer[] = this.enable_offers
        ? [
              new o_offers.Offer({
                  name: 'tinkoff_black',
                  has_ad_label: true,
                  browsers_blacklist: ['edge'],
                  countries_whitelist: ['ru'],
              }),
              new o_offers.Offer({
                  name: 'tinkoff_investments_brokerage_account',
                  has_ad_label: true,
                  browsers_blacklist: ['edge'],
                  countries_whitelist: ['ru'],
              }),
              new o_offers.Offer({
                  name: 'keymeleon',
                  prominent: true,
              }),
              new o_offers.Offer({
                  name: 'other_projects',
                  browsers_blacklist: ['edge'],
                  prominent: true,
              }),
              new o_offers.Offer({
                  name: 'animated_themes',
                  prominent: true,
                  exts_whitelist: [...this.clear_new_tab],
                  browsers_whitelist: ['chrome'],
                  force_offer_despite_extension_name_in_its_text: true,
              }),
              new o_offers.Offer({
                  name: 'clear_new_tab',
                  browsers_whitelist: 'all',
                  browsers_blacklist: ['opera', 'brave', 'yandex', 'firefox'],
              }),
              new o_offers.Offer({
                  name: 'empty_new_tab_page',
                  browsers_whitelist: 'all',
                  browsers_blacklist: ['opera', 'brave', 'yandex', 'firefox'],
              }),
              new o_offers.Offer({
                  name: 'close_other_tabs_plus',
                  browsers_whitelist: 'all',
                  browsers_blacklist: ['opera', 'brave', 'yandex', 'firefox'],
              }),
              new o_offers.Offer({
                  name: 'search_enhancer_for_google',
                  browsers_whitelist: 'all',
                  browsers_blacklist: ['opera', 'brave', 'yandex', 'firefox'],
              }),
              new o_offers.Offer({
                  name: 'scroll_to_top',
                  browsers_whitelist: 'all',
                  browsers_blacklist: ['opera', 'brave', 'yandex', 'firefox'],
              }),
              new o_offers.Offer({
                  name: 'advanced_extension_reloader',
                  browsers_whitelist: 'all',
                  browsers_blacklist: ['opera', 'brave', 'yandex', 'firefox'],
              }),
          ]
        : [];
}

export const Offers = Class.get_instance();
