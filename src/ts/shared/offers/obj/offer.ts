export class Offer {
    public name?: string = '';
    public browsers?: string | string[] = 'all';
    public countries_whitelist?: string | string[] = 'all';
    public countries_blacklist?: string[] = [];
    public is_enabled?: boolean = true;
    public prominent?: boolean = false;
    public has_banner?: boolean = false;

    public constructor(obj: Offer) {
        Object.assign(this, obj);
    }
}
