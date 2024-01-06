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

    public offers: o_offers.Offer[] = this.enable_offers
        ? [
              new o_offers.Offer({
                  name: 'animated_themes',
                  exts_whitelist: [
                      'nnmhbhoglljdlhbllfgkemgenlplalie',
                      'felphkbfjadmcejnibcmcncimlappdde',
                  ], // Clear New Tab
                  browsers_whitelist: ['chrome'],
                  prominent: true,
                  force_offer_despite_extension_name_in_its_text: true,
              }),
              new o_offers.Offer({ name: 'clear_new_tab', prominent: true }),
              new o_offers.Offer({ name: 'empty_new_tab_page', prominent: true }),
              new o_offers.Offer({ name: 'search_enhancer_for_google', prominent: true }),
              new o_offers.Offer({ name: 'scroll_to_top', prominent: true }),
              new o_offers.Offer({
                  name: 'close_other_tabs',
                  browsers_whitelist: ['chrome'],
                  prominent: true,
              }),
              new o_offers.Offer({ name: 'advanced_extension_reloader', prominent: true }),
          ]
        : [];
}
