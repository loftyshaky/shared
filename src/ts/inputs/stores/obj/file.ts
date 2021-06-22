import { o_inputs } from 'inputs/internal';

export class File extends o_inputs.InputBase {
    public type?: 'file' = 'file';
    public accept: string;

    public constructor(obj: File) {
        super(obj);
        Object.assign(this, obj);
        this.accept = obj.accept;
    }
}
