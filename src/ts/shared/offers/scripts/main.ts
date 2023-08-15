import { o_offers } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public offers: o_offers.Offer[] = [
        new o_offers.Offer({
            name: 'floral_pattern',
            prominent: true,
            has_banner: true,
        }),
        new o_offers.Offer({
            name: 'tinkoff_black',
            prominent: true,
            countries_whitelist: ['ru'],
        }),
        new o_offers.Offer({
            name: 'tinkoff_investments_brokerage_account',
            prominent: true,
            countries_whitelist: ['ru'],
        }),
        new o_offers.Offer({ name: 'one_drive' }),
        new o_offers.Offer({ name: 'clear_new_tab' }),
        new o_offers.Offer({ name: 'empty_new_tab_page' }),
        new o_offers.Offer({ name: 'search_enhancer_for_google' }),
        new o_offers.Offer({ name: 'scroll_to_top' }),
        new o_offers.Offer({ name: 'close_other_tabs', browsers: ['chrome'] }),
        new o_offers.Offer({ name: 'advanced_extension_reloader' }),
    ];
}
