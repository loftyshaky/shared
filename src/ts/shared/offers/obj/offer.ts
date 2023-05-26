export class Offer {
    public name: string = '';
    public browsers?: string | string[] = 'all';
    public countries?: string | string[] = 'all';

    public constructor(obj: Offer) {
        Object.assign(this, obj);
    }
}
