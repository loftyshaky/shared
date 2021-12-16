export class Hr {
    public name: string;
    public type?: 'hr' = 'hr';

    public constructor(obj: Hr) {
        Object.assign(this, obj);

        this.name = obj.name;
    }
}
