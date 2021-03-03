export class Option {
    public name: string;
    public val?: string;
    public alt_msg?: string;

    public constructor(obj: Option) {
        Object.assign(
            this,
            obj,
        );
        this.name = obj.name;
    }
}
