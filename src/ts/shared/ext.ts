// Allowing send_msg functions to throw errors (red) makes extension freeze when sending message to tab without onMessage event listrener!

import _ from 'lodash';
import { browser, Tabs, Windows } from 'webextension-polyfill-ts';

import { t } from 'shared/internal';

declare const global: Global;

declare global {
    const page: string;
    const misplaced_dependency: t.CallbackVariadicVoid;
}

((): void => {
    const title = global.document ? document.querySelector('title') : undefined;

    if (['https:', 'http:'].includes(global.location.protocol)) {
        global.page = 'content_script';
    } else {
        global.page = n(title) && n(title.dataset.page) ? title.dataset.page : 'background';
    }
})();

global.misplaced_dependency = (culprit_page: string, current_page_cond?: t.CallbackAny): void => {
    const current_page: string = n(current_page_cond) ? current_page_cond() : page;

    if (current_page !== culprit_page) {
        const msg: string =
            browser.i18n.getMessage('dependencicies_from_other_page_loaded_into_this_page_alert') +
            culprit_page.toUpperCase();

        if (current_page === 'background') {
            // eslint-disable-next-line no-console
            console.log(msg);
        } else {
            // eslint-disable-next-line no-alert
            alert(msg);
        }
    }
};

export class Ext {
    private static i0: Ext;

    public static i(): Ext {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private log_error = (error_obj: any): void => {
        // eslint-disable-next-line no-console
        console.log(error_obj.message);
    };

    public msg = (msg: string): string => {
        const msg_2: string | undefined = browser.i18n.getMessage(msg);

        return n(msg_2) ? msg_2 : '';
    };

    public get_active_tab = async (): Promise<Tabs.Tab> => {
        const tabs: Tabs.Tab[] = await browser.tabs.query({
            active: true,
            currentWindow: true,
        });

        return tabs[0];
    };

    public send_msg = async (msg: t.Msg): Promise<any> => {
        try {
            await browser.runtime.sendMessage(msg);
        } catch (error_obj) {
            this.log_error(error_obj);
        }
    };

    public send_msg_resp = async (msg: t.Msg): Promise<any> => {
        try {
            const response = await browser.runtime.sendMessage(msg);

            return response;
        } catch (error_obj) {
            this.log_error(error_obj);
        }

        return undefined;
    };

    public send_msg_to_tab = async (id: number, msg: t.Msg): Promise<void> => {
        try {
            await browser.tabs.sendMessage(id, msg);
        } catch (error_obj) {
            this.log_error(error_obj);
        }
    };

    public send_msg_to_tab_resp = async (id: number, msg: t.Msg): Promise<any> => {
        try {
            const response = await browser.tabs.sendMessage(id, msg);

            return response;
        } catch (error_obj) {
            this.log_error(error_obj);
        }

        return undefined;
    };

    public send_msg_to_active_tab = async (msg: t.Msg): Promise<void> => {
        const tab: Tabs.Tab = await this.get_active_tab();

        if (n(tab.id)) {
            await this.send_msg_to_tab(tab.id, msg);
        }
    };

    public send_msg_to_active_tab_resp = async (msg: t.Msg): Promise<any> => {
        const tab: Tabs.Tab = await this.get_active_tab();

        if (n(tab.id)) {
            return this.send_msg_to_tab(tab.id, msg);
        }

        return undefined;
    };

    public iterate_all_tabs = async (msg: t.Msg): Promise<void> => {
        const windows: Windows.Window[] = await browser.windows.getAll({
            populate: true,
            windowTypes: ['normal'],
        });

        windows.forEach((window: Windows.Window): void => {
            if (n(window.tabs)) {
                window.tabs.forEach((tab: Tabs.Tab): void => {
                    if (n(tab.id)) {
                        this.send_msg_to_tab(tab.id, msg);
                    }
                });
            }
        });
    };

    public storage_get = async (keys?: any): Promise<any> => {
        const data_sync: any = await browser.storage.sync.get(keys);

        if (n(data_sync)) {
            return data_sync;
        }

        const data_local: any = await browser.storage.local.get(keys);

        return data_local;
    };

    public storage_set = async (obj: any): Promise<void> => {
        try {
            const data_local: any = await browser.storage.local.get();

            if (n(data_local)) {
                const merged_data: any = _.merge(data_local, obj);

                await browser.storage.sync.set(merged_data);
            } else {
                await browser.storage.sync.set(obj);
            }

            await browser.storage.local.clear();
        } catch (error_obj) {
            const data_sync: any = await browser.storage.sync.get();

            if (n(data_sync)) {
                await browser.storage.local.set(data_sync);
                await browser.storage.sync.clear();
            }

            await browser.storage.local.set(obj);
        }
    };
}
