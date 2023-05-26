import _ from 'lodash';
import { makeObservable, observable, computed, action } from 'mobx';

import { o_offers, s_offers } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<this, 'current_offer_i'>(this, {
            current_offer_text: computed,
            current_offer_no: computed,
            current_offer_i: observable,
            choose_random_offer: action,
            show_next_offer: action,
        });
    }

    public offers_of_type: o_offers.Offer[] = [];
    public current_offer_i: number = 0;

    public choose_random_offer = (): void =>
        err(() => {
            const ext_name: string = ext.get_app_name();

            const get_offers_of_type = (): o_offers.Offer[] =>
                err(() => {
                    const offers_of_type: o_offers.Offer[] = s_offers.Main.i().offers.flatMap(
                        (offer: o_offers.Offer): o_offers.Offer[] =>
                            err(() => {
                                const offer_text_raw: string = this.get_offer_text_raw({
                                    name: offer.name,
                                });
                                const is_all_or_current_type_offer =
                                    (offer.countries === 'all' ||
                                        (offer.countries as string[]).some(
                                            (country: string): boolean =>
                                                err(() => country === ui_language, 'shr_1272'),
                                        )) &&
                                    (offer.browsers === 'all' ||
                                        (offer.browsers as string[]).some(
                                            (browser: string): boolean =>
                                                err(() => browser === env.browser, 'shr_1276'),
                                        ));
                                const offer_is_current_ext: boolean =
                                    offer_text_raw.includes(ext_name);

                                if (is_all_or_current_type_offer && !offer_is_current_ext) {
                                    return [offer];
                                }

                                return [];
                            }, 'shr_1271'),
                    );

                    return offers_of_type;
                }, 'shr_1270');

            const ui_language = we.i18n.getUILanguage();

            this.offers_of_type = get_offers_of_type();

            this.current_offer_i = x.range(0, this.offers_of_type.length - 1);
        }, 'shr_1269');

    public found_offers_for_current_locale = (): boolean =>
        err(() => !_.isEmpty(this.offers_of_type), 'shr_1273');

    public show_previous_offer = (): void =>
        err(() => {
            this.current_offer_i =
                this.current_offer_i - 1 === -1
                    ? this.offers_of_type.length - 1
                    : this.current_offer_i - 1;
        }, 'shr_1275');

    public show_next_offer = (): void =>
        err(() => {
            this.current_offer_i =
                this.current_offer_i + 1 === this.offers_of_type.length
                    ? 0
                    : this.current_offer_i + 1;
        }, 'shr_1274');

    private get_offer_text_raw = ({ name }: { name: string }): string =>
        err(() => {
            const offer_text_raw: string = ext.msg(`offer_${name}_text`);

            return offer_text_raw;
        }, 'shr_1278');

    public get current_offer_text(): string {
        if (this.found_offers_for_current_locale()) {
            const offer_text_raw: string = this.get_offer_text_raw({
                name: this.offers_of_type[this.current_offer_i].name,
            });
            const offer_link: string = ext.msg(
                `offer_${this.offers_of_type[this.current_offer_i].name}_link_href`,
            );
            const offer_link_browser: string = ext.msg(
                `offer_${this.offers_of_type[this.current_offer_i].name}_${env.browser}_link_href`,
            );
            const offer_link_final: string =
                offer_link_browser === '' ? offer_link : offer_link_browser;

            return offer_text_raw
                .replace(
                    /@.*@/gm,
                    `<a class='link offer' href='${offer_link_final}' target='_blank' rel='noopener noreferrer'>$&</a>`,
                )
                .replace(/@/gm, '');
        }

        return '';
    }

    public get current_offer_no(): number {
        return this.current_offer_i + 1;
    }
}
