export class Label {
    public name: string;
    public type? = 'label' as const;

    public constructor(obj: Label) {
        Object.assign(this, obj);

        this.name = obj.name;
    }
}
