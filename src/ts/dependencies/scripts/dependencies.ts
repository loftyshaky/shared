import { makeObservable, observable, runInAction } from 'mobx';

import { t } from 'shared/internal';

export class Dependencies {
    private static i0: Dependencies;

    public static i(): Dependencies {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
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
                                    'ges_1293',
                                ),
                            '',
                        );

                        return `${accumulator}<br><hr><br><div>${entry}</div>`;
                    }, 'ges_1292'),
                '',
            );

            runInAction(() =>
                err(() => {
                    this.dependencies_text = dependencies_json_text.replace(/\n/gm, '<br>');
                }, 'shr_1291'),
            );
        }, 'ges_1290');
}
