// Allowing send_msg functions to throw errors (red) makes extension freeze when sending message to tab without onMessage event listrener!

import _ from 'lodash';
import { browser, Tabs, Windows } from 'webextension-polyfill-ts';

import { t } from 'shared/internal';

declare const global: Global;

declare global {
    const page: string;
    const misplaced_dependency: (culprit_page: string) => void;
}

export const init_page = (): void =>
    err(() => {
        const title = global.document ? document.querySelector('title') : undefined;

        if (['https:', 'http:'].includes(global.location.protocol)) {
            global.page = 'content_script';
        } else {
            global.page = n(title) && n(title.dataset.page) ? title.dataset.page : 'background';
        }
    }, 'shr_1011');

global.misplaced_dependency = (culprit_page: string): void =>
    err(() => {
        if (page !== culprit_page) {
            const msg: string =
                browser.i18n.getMessage(
                    'dependencicies_from_other_page_loaded_into_this_page_alert',
                ) + culprit_page.toUpperCase();

            if (page === 'background') {
                // eslint-disable-next-line no-console
                console.log(msg);
            } else {
                // eslint-disable-next-line no-alert
                alert(msg);
            }
        }
    }, 'shr_1012');

export class Ext {
    private static i0: Ext;

    public static i(): Ext {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private log_error = (error_obj: Error): void =>
        err(() => {
            // eslint-disable-next-line no-console
            console.log(error_obj.message);
        }, 'shr_1013');

    public get_ext_version = (): string =>
        err(() => browser.runtime.getManifest().version, 'shr_1013');

    public iterate_all_tabs = (callback: t.CallbackVariadicVoid): Promise<void> =>
        err_async(async () => {
            const windows: Windows.Window[] = await browser.windows.getAll({
                populate: true,
                windowTypes: ['normal'],
            });

            windows.forEach((window: Windows.Window): void => {
                if (n(window.tabs)) {
                    window.tabs.forEach((tab: Tabs.Tab): void => {
                        if (n(tab.id)) {
                            callback(tab);
                        }
                    });
                }
            });
        }, 'shr_1179');

    public msg = (msg: string): string =>
        err(() => {
            const msg_2: string | undefined = browser.i18n.getMessage(msg);

            return n(msg_2) ? msg_2 : '';
        }, 'shr_1014');

    public get_active_tab = (): Promise<Tabs.Tab> =>
        err_async(async () => {
            const tabs: Tabs.Tab[] = await browser.tabs.query({
                active: true,
                currentWindow: true,
            });

            return tabs[0];
        }, 'shr_1015');

    public send_msg = (msg: t.Msg): Promise<void> =>
        err_async(async () => {
            try {
                await browser.runtime.sendMessage(msg);
            } catch (error_obj) {
                this.log_error(error_obj);
            }
        }, 'shr_1016');

    public send_msg_resp = (msg: t.Msg): Promise<any> =>
        err_async(async () => {
            try {
                const response = await browser.runtime.sendMessage(msg);

                return response;
            } catch (error_obj) {
                this.log_error(error_obj);
            }

            return undefined;
        }, 'shr_1017');

    public send_msg_to_tab = (id: number, msg: t.Msg): Promise<void> =>
        err_async(async () => {
            try {
                await browser.tabs.sendMessage(id, msg);
            } catch (error_obj) {
                this.log_error(error_obj);
            }
        }, 'shr_1018');

    public send_msg_to_tab_resp = (id: number, msg: t.Msg): Promise<void> =>
        err_async(async () => {
            try {
                const response = await browser.tabs.sendMessage(id, msg);

                return response;
            } catch (error_obj) {
                this.log_error(error_obj);
            }

            return undefined;
        }, 'shr_1019');

    public send_msg_to_active_tab = (msg: t.Msg): Promise<void> =>
        err_async(async () => {
            const tab: Tabs.Tab = await this.get_active_tab();

            if (n(tab.id)) {
                await this.send_msg_to_tab(tab.id, msg);
            }
        }, 'shr_1020');

    public send_msg_to_active_tab_resp = (msg: t.Msg): Promise<void> =>
        err_async(async () => {
            const tab: Tabs.Tab = await this.get_active_tab();

            if (n(tab.id)) {
                return this.send_msg_to_tab(tab.id, msg);
            }

            return undefined;
        }, 'shr_1021');

    public send_msg_to_all_tabs = (msg: t.Msg): Promise<void> =>
        err_async(async () => {
            await this.iterate_all_tabs((tab: Tabs.Tab) =>
                err_async(async () => {
                    if (n(tab.id)) {
                        await this.send_msg_to_tab(tab.id, msg);
                    }
                }, 'shr_1180'),
            );
        }, 'shr_1022');

    public storage_get = (keys?: string | string[]): Promise<any> =>
        err_async(async () => {
            const data_sync: t.AnyRecord = await browser.storage.sync.get(keys);

            if (n(data_sync)) {
                return data_sync;
            }

            const data_local: t.AnyRecord = await browser.storage.local.get(keys);

            return data_local;
        }, 'shr_1023');

    public storage_set = (obj: t.AnyRecord): Promise<void> =>
        err_async(async () => {
            try {
                const data_local: t.AnyRecord = await browser.storage.local.get();

                if (n(data_local)) {
                    const merged_data: t.AnyRecord = _.merge(data_local, obj);

                    await browser.storage.sync.set(merged_data);
                } else {
                    await browser.storage.sync.set(obj);
                }

                await browser.storage.local.clear();
            } catch (error_obj) {
                const data_sync: t.AnyRecord = await browser.storage.sync.get();

                if (n(data_sync)) {
                    await browser.storage.local.set(data_sync);
                    await browser.storage.sync.clear();
                }

                await browser.storage.local.set(obj);
            }
        }, 'shr_1024');
}
