export class Hr {
    public name: string;
    public id?: string = x.unique_id();
    public type? = 'hr' as const;

    public constructor(obj: Hr) {
        Object.assign(this, obj);

        this.name = obj.name;
    }
}
