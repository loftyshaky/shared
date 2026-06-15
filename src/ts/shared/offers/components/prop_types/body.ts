import type { i_offers } from 'shared/internal';

export interface Body {
    is_visible: boolean;
    offer_banner_type: i_offers.OfferBannerType;
}
