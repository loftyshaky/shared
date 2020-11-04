export class Utils {
    private static i0: Utils;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public to_object = (
        {
            arr,
            section,
            subsection,
        }: {
            arr: any;
            section?: string;
            subsection?: string
        },
    ): any => err(() => {
        const obj_final: { [index: string]: any } = {};

        arr.forEach((item: any): void => {
            obj_final[item.name] = item;

            if (section) {
                obj_final[item.name].section = section;
            }

            if (subsection) {
                obj_final[item.name].subsection = subsection;
            }
        });

        return obj_final;
    },
    's1010');
}
