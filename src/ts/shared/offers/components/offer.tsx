import { observer } from 'mobx-react-lite';

import { d_offers, type p_offers } from 'shared/internal';

export const Offer: React.FunctionComponent<p_offers.Offer> = observer((props) => {
    const { offer_banner_type } = props;
    const current_offer_banner = d_offers.Offers.get_current_offer_banner({
        offer_banner_type,
    });

    return (
        <div className='offer'>
            <p
                dangerouslySetInnerHTML={{
                    __html: d_offers.Offers.current_offer_text,
                }}
            />
            {n(current_offer_banner) ? (
                <a
                    href={d_offers.Offers.current_offer_banner_link}
                    target='_blank'
                    rel='noreferrer'
                >
                    <img src={current_offer_banner} alt='Offer banner' draggable='false' />
                </a>
            ) : undefined}
        </div>
    );
});
