import { makeObservable, observable, runInAction } from 'mobx';

import { t } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable(this, {
            dependencies_text: observable,
        });
    }

    public dependencies_text: string = '';

    public generate_dependencies_text_from_depengencies_json = (): Promise<void> =>
        err_async(async () => {
            const dependencies = await fetch('dependencies.json');
            const dependencies_json: t.AnyRecord[] = await dependencies.json();

            const dependencies_json_text: string = dependencies_json.reduce(
                (accumulator: string, dependency: t.AnyRecord): string =>
                    err(() => {
                        const entry: string = Object.entries(dependency).reduce(
                            (accumulator_2: string, [key, val]): string =>
                                err(
                                    () =>
                                        `${accumulator_2}<div>${
                                            n(key) && n(val)
                                                ? `${key}: ${x.wrap_link_in_a(val)}`
                                                : ''
                                        }</div>`,
                                    'shr_1293',
                                ),
                            '',
                        );

                        return `${accumulator}<br><hr><br><div>${entry}</div>`;
                    }, 'shr_1292'),
                '',
            );

            runInAction(() =>
                err(() => {
                    this.dependencies_text = dependencies_json_text.replace(/\n/gm, '<br>');
                }, 'shr_1291'),
            );
        }, 'shr_1290');
}

export const Dependencies = Class.get_instance();
