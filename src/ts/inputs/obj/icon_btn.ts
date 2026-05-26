import { o_inputs } from 'inputs/internal';

export class IconBtn extends o_inputs.InputBase {
    public type? = 'icon_btn' as const;
    public Svg: string = '';
    public include_label?: boolean = false;

    public constructor(obj: IconBtn) {
        super(obj);
        Object.assign(this, obj);
    }
}
