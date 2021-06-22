export class Utils {
    private static i0: Utils;

    public static i(): Utils {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public to_object = ({
        arr,
        section,
        subsection,
    }: {
        arr: any;
        section?: string;
        subsection?: string;
    }): any =>
        err(() => {
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
        }, 's1010');
}
