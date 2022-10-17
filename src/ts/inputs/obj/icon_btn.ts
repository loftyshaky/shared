import { o_inputs, i_inputs } from 'inputs/internal';

export class IconBtn extends o_inputs.InputBase {
    public type?: 'icon_btn' = 'icon_btn';
    public Svg: string = '';
    public btn_options?: i_inputs.BtnOption[];

    public constructor(obj: IconBtn) {
        super(obj);
        Object.assign(this, obj);
    }
}
