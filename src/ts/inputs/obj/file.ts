import { t } from 'shared_clean/internal';
import { o_inputs } from 'inputs/internal';

export class File extends o_inputs.InputBase {
    public type? = 'file' as const;
    public accept: string;
    public multiple?: boolean = false;
    public save_callback?: t.CallbackVariadicVoid;

    public constructor(obj: File) {
        super(obj);
        Object.assign(this, obj);
        this.accept = obj.accept;
        this.save_callback = obj.save_callback;
    }
}
