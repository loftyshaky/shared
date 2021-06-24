export class Transition {
    public unactive_cls: string;
    public active_cls: string;

    public constructor(obj: { unactive_cls: string; active_cls: string }) {
        this.unactive_cls = obj.unactive_cls;
        this.active_cls = obj.active_cls;
    }
}
