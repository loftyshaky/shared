import { t } from 'shared/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
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
        arr: t.AnyRecord[];
        section?: string;
        subsection?: string;
    }): t.AnyRecord =>
        err(() => {
            const obj_final: t.AnyRecord = {};

            arr.forEach((item: t.AnyRecord): void =>
                err(() => {
                    obj_final[item.name] = item;

                    if (section) {
                        obj_final[item.name].section = section;
                    }

                    if (subsection) {
                        obj_final[item.name].subsection = subsection;
                    }

                    if (n(obj_final[item.name].inputs)) {
                        const innner_inputs = [...obj_final[item.name].inputs];

                        obj_final[item.name].inputs = [];

                        innner_inputs.forEach((item_2: t.AnyRecord, i: number) => {
                            obj_final[item.name].inputs[i] = item_2;

                            if (section) {
                                obj_final[item.name].inputs[i].section = section;
                            }

                            if (subsection) {
                                obj_final[item.name].inputs[i].subsection = subsection;
                            }

                            if (item.type === 'form') {
                                obj_final[item.name].inputs[i].form = item.name;
                            }
                        });
                    }
                }, 'shr_1136'),
            );

            return obj_final;
        }, 'shr_1137');
}
