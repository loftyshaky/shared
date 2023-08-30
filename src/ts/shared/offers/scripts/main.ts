import { o_offers } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private enable_offers: boolean = env.browser === 'chrome';

    public offers: o_offers.Offer[] = this.enable_offers
        ? [
              new o_offers.Offer({ name: 'clear_new_tab', prominent: true }),
              new o_offers.Offer({ name: 'empty_new_tab_page', prominent: true }),
              new o_offers.Offer({ name: 'search_enhancer_for_google', prominent: true }),
              new o_offers.Offer({ name: 'scroll_to_top', prominent: true }),
              new o_offers.Offer({
                  name: 'close_other_tabs',
                  browsers: ['chrome'],
                  prominent: true,
              }),
              new o_offers.Offer({ name: 'advanced_extension_reloader', prominent: true }),
          ]
        : [];
}
