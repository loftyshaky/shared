import { browser } from 'webextension-polyfill-ts';

import { t } from 'shared/internal';

export class Tabs {
    private static i0: Tabs;

    public static i(): Tabs {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public add_on_updated_listener = ({
        connect_cond,
    }: {
        connect_cond: t.CallbackBoolean;
    }): void =>
        err(() => {
            browser.tabs.onUpdated.addListener((tab_id: number): void =>
                err(() => {
                    if (connect_cond()) {
                        browser.tabs.connect(tab_id);
                    }
                }, 'shr_1181'),
            );
        }, 'shr_1182');

    public add_on_connect_listener = (): void =>
        err(() => {
            browser.runtime.onConnect.addListener(() => undefined);
        }, 'shr_1183');
}
