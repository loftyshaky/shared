export class TransformItem {
    public old_key?: string;
    public new_key: string;
    public new_val?: any;

    public constructor(obj: TransformItem) {
        Object.assign(this, obj);
        this.old_key = obj.old_key;
        this.new_key = obj.new_key;
        this.new_val = obj.new_val;
    }
}
