import { o_inputs } from 'inputs/internal';

export class IconBtn extends o_inputs.InputBase {
    public type?: 'icon_btn' = 'icon_btn';
    public Svg: string = '';

    public constructor(obj: IconBtn) {
        super(obj);
        Object.assign(this, obj);
    }
}
