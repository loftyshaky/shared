import isEmpty from 'lodash/isEmpty';
import union from 'lodash/union';
import { makeObservable, observable, computed, action } from 'mobx';

import { o_offers, s_offers, i_offers } from 'shared/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable<this, 'current_offer_i' | 'choose_random_prominent_offer'>(this, {
            current_offer_text: computed,
            current_offer_no: computed,
            current_offer_i: observable,
            choose_random_prominent_offer: action,
            show_next_offer: action,
        });
    }

    public offers_of_type: o_offers.Offer[] = [];
    public current_offer_i: number = 0;

    public set_offers = (): void =>
        err(() => {
            this.set_offers_of_type();
            this.choose_random_prominent_offer();
        }, 'shr_1280');

    public choose_random_prominent_offer = (): void =>
        err(() => {
            const found_at_least_one_prominent_offer: boolean = this.offers_of_type.some(
                (offer: o_offers.Offer): boolean =>
                    err(() => (n(offer.prominent) ? offer.prominent : false), 'shr_1297'),
            );
            const prominent_offers: o_offers.Offer[] = this.offers_of_type.filter(
                (offer: o_offers.Offer): boolean =>
                    err(() => {
                        const this_offer_is_prominent: boolean = n(offer.prominent)
                            ? offer.prominent
                            : false;

                        return found_at_least_one_prominent_offer ? this_offer_is_prominent : true;
                    }, 'shr_1282'),
            );

            this.current_offer_i = x.range(0, prominent_offers.length - 1);

            this.offers_of_type = union(prominent_offers, this.offers_of_type);
        }, 'shr_1281');

    public set_offers_of_type = (): void =>
        err(() => {
            const ext_name: string = ext.get_app_name();

            const get_offers_of_type = (): o_offers.Offer[] =>
                err(() => {
                    const offers_of_type: o_offers.Offer[] = s_offers.Offers.offers.flatMap(
                        (offer: o_offers.Offer): o_offers.Offer[] =>
                            err(() => {
                                const offer_text_raw: string = this.get_offer_text_raw({
                                    name: offer.name,
                                });
                                const is_all_or_current_type_offer =
                                    this.check_if_is_all_or_current_type_offer({ offer });

                                const offer_is_current_ext: boolean =
                                    offer_text_raw.includes(ext_name);

                                if (
                                    offer.is_enabled &&
                                    is_all_or_current_type_offer &&
                                    (!offer_is_current_ext ||
                                        offer.force_offer_despite_extension_name_in_its_text)
                                ) {
                                    return [offer];
                                }

                                return [];
                            }, 'shr_1271'),
                    );

                    return offers_of_type;
                }, 'shr_1270');

            this.offers_of_type = get_offers_of_type();
        }, 'shr_1269');

    private check_if_is_all_or_current_type_offer = ({
        offer,
    }: {
        offer: o_offers.Offer;
    }): boolean =>
        err(() => {
            const ui_language = we.i18n.getUILanguage();

            const this_offer_is_whitelisted_for_this_ui_language: boolean =
                offer.countries_whitelist === 'all' ||
                (offer.countries_whitelist as string[]).some((country: string): boolean =>
                    err(() => country === ui_language, 'shr_1272'),
                );
            const this_offer_is_not_blacklisted_for_this_ui_language: boolean = (
                offer.countries_blacklist as string[]
            ).every((country: string): boolean => err(() => country !== ui_language, 'shr_1272'));
            const this_offer_is_allowed_for_this_browser: boolean =
                offer.browsers_whitelist === 'all' ||
                (offer.browsers_whitelist as string[]).some((browser: string): boolean =>
                    err(() => browser === env.browser, 'shr_1276'),
                );
            const this_offer_is_allowed_for_this_ext: boolean =
                offer.exts_whitelist === 'all' ||
                (offer.exts_whitelist as string[]).some((id: string): boolean =>
                    err(() => id === we.runtime.id, 'shr_1296'),
                );

            const is_all_or_current_type_offer =
                this_offer_is_whitelisted_for_this_ui_language &&
                this_offer_is_not_blacklisted_for_this_ui_language &&
                this_offer_is_allowed_for_this_browser &&
                this_offer_is_allowed_for_this_ext;

            return is_all_or_current_type_offer;
        }, 'shr_1279');

    public found_offers_for_current_locale = (): boolean =>
        err(() => !isEmpty(this.offers_of_type), 'shr_1273');

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

    private get_offer_text_raw = ({ name }: { name: string | undefined }): string =>
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

    public get_current_offer_banner = ({
        offer_banner_type,
    }: {
        offer_banner_type: i_offers.OfferBannerType;
    }): string | undefined => {
        const offer: o_offers.Offer = this.offers_of_type[this.current_offer_i];

        if (offer.has_banner) {
            return `offer_${offer.name}_${offer_banner_type}.png`;
        }

        return undefined;
    };

    public get_ad_label_visibility_state = (): boolean => {
        const offer: o_offers.Offer = this.offers_of_type[this.current_offer_i];

        return n(offer.has_ad_label) ? offer.has_ad_label : false;
    };

    public get current_offer_banner_link(): string {
        const offer: o_offers.Offer = this.offers_of_type[this.current_offer_i];

        return ext.msg(`offer_${offer.name}_link_href`);
    }

    public get current_offer_no(): number {
        return this.current_offer_i + 1;
    }
}

export const Offers = Class.get_instance();
