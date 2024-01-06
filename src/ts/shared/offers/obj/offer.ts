export class Offer {
    public name?: string = '';
    public exts_whitelist?: string | string[] = 'all';
    public browsers_whitelist?: string | string[] = 'all';
    public countries_whitelist?: string | string[] = 'all';
    public countries_blacklist?: string[] = [];
    public is_enabled?: boolean = true;
    public prominent?: boolean = false;
    public has_banner?: boolean = false;
    public force_offer_despite_extension_name_in_its_text?: boolean = false;

    public constructor(obj: Offer) {
        Object.assign(this, obj);
    }
}
