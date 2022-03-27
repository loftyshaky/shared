export class Option {
    public name: string;
    public val?: string | number;
    public alt_msg?: string;

    public constructor(obj: Option) {
        Object.assign(this, obj);
        this.name = obj.name;
        this.val = n(obj.val) ? obj.val : obj.name;
    }
}
