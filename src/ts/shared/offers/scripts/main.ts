import { o_offers } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private enable_offers: boolean = true;

    private clear_new_tab: string[] = [
        'nnmhbhoglljdlhbllfgkemgenlplalie',
        'felphkbfjadmcejnibcmcncimlappdde',
    ];

    private search_enhancer_for_google: string[] = [
        'mfihhepjphokhfnlioficodoomlnhlbd',
        'pipbbdfondfipmjmdkmggihiknhmcfhd',
    ];

    private advanced_extension_reloader: string[] = [
        'hmhmmmajoblhmohkmfjeoamhdpodihlg',
        'hagknokdofkmojolcpbddjfdjhnjdkae',
    ];

    public offers: o_offers.Offer[] = this.enable_offers
        ? [
              new o_offers.Offer({
                  name: 'tinkoff_black',
                  prominent: true,
                  has_ad_label: true,
                  browsers_whitelist: ['chrome'],
                  countries_whitelist: ['ru'],
              }),
              new o_offers.Offer({
                  name: 'tinkoff_investments_brokerage_account',
                  prominent: true,
                  has_ad_label: true,
                  browsers_whitelist: ['chrome'],
                  countries_whitelist: ['ru'],
              }),
              new o_offers.Offer({
                  name: 'animated_themes',
                  exts_whitelist: [...this.clear_new_tab],
                  browsers_whitelist: ['chrome'],
                  force_offer_despite_extension_name_in_its_text: true,
              }),
              new o_offers.Offer({ name: 'clear_new_tab' }),
              new o_offers.Offer({ name: 'empty_new_tab_page' }),
              new o_offers.Offer({ name: 'search_enhancer_for_google' }),
              new o_offers.Offer({ name: 'scroll_to_top' }),
              new o_offers.Offer({
                  name: 'close_other_tabs_plus',
                  browsers_whitelist: ['chrome'],
              }),
              new o_offers.Offer({ name: 'advanced_extension_reloader' }),
          ]
        : [];
}
