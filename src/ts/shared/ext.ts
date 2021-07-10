// Allowing send_msg functions to throw errors (red) makes extension freeze when sending message to tab without onMessage event listrener!
// Not using err/err_async because it causes infinite loop in content script and freezing when you disable/reload extension!

import { browser as browser_2 } from 'webextension-polyfill-ts';
import _ from 'lodash';

import { d_error } from 'error_modules/internal';
import { t } from 'shared/internal';

declare const global: Global;

declare global {
    const we: typeof browser;
    const page: string;
    const misplaced_dependency: (culprit_page: string) => void;
}

global.we = browser_2 as any;

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
                we.i18n.getMessage('dependencicies_from_other_page_loaded_into_this_page_alert') +
                culprit_page.toUpperCase();

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

    private log_error = (error_obj: Error, error_code: string): void => {
        // eslint-disable-next-line no-console
        d_error.Main.i().output_error(error_obj, error_code);
    };

    public get_ext_version = (): string => {
        try {
            return we.runtime.getManifest().version;
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1013');
        }

        return '';
    };

    public iterate_all_tabs = async (callback: t.CallbackVariadicVoid): Promise<void> => {
        try {
            const windows: browser.windows.Window[] = await we.windows.getAll({
                populate: true,
                windowTypes: ['normal'],
            });

            windows.forEach((window: browser.windows.Window): void => {
                if (n(window.tabs)) {
                    window.tabs.forEach((tab: browser.tabs.Tab): void => {
                        if (n(tab.id)) {
                            callback(tab);
                        }
                    });
                }
            });
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1179');
        }
    };

    public msg = (msg: string): string => {
        try {
            const msg_2: string | undefined = we.i18n.getMessage(msg);

            return n(msg_2) ? msg_2 : '';
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1014');
        }

        return '';
    };

    public get_active_tab = async (): Promise<browser.tabs.Tab | undefined> => {
        try {
            const tabs: browser.tabs.Tab[] = await we.tabs.query({
                active: true,
                currentWindow: true,
            });

            return tabs[0];
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1015');
        }

        return undefined;
    };

    public send_msg = async (msg: t.Msg): Promise<void> => {
        try {
            await we.runtime.sendMessage(msg);
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1016');
        }
    };

    public send_msg_resp = async (msg: t.Msg): Promise<any> => {
        try {
            const response = await we.runtime.sendMessage(msg);

            return response;
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1017');
        }

        return undefined;
    };

    public send_msg_to_tab = async (id: number, msg: t.Msg): Promise<void> => {
        try {
            await we.tabs.sendMessage(id, msg);
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1018');
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    public send_msg_to_tab_resp = async (id: number, msg: t.Msg): Promise<void | object> => {
        try {
            const response = await we.tabs.sendMessage(id, msg);

            return response;
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1019');
        }

        return undefined;
    };

    public send_msg_to_active_tab = async (msg: t.Msg): Promise<void> => {
        try {
            const tab: browser.tabs.Tab | undefined = await this.get_active_tab();

            if (n(tab) && n(tab.id)) {
                await this.send_msg_to_tab(tab.id, msg);
            }
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1020');
        }
    };

    public send_msg_to_active_tab_resp = async (msg: t.Msg): Promise<any> => {
        try {
            const tab: browser.tabs.Tab | undefined = await this.get_active_tab();

            if (n(tab) && n(tab.id)) {
                return this.send_msg_to_tab(tab.id, msg);
            }
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1021');
        }

        return undefined;
    };

    public send_msg_to_all_tabs = async (msg: t.Msg): Promise<void> => {
        try {
            await this.iterate_all_tabs(async (tab: browser.tabs.Tab) => {
                try {
                    if (n(tab.id)) {
                        await this.send_msg_to_tab(tab.id, msg);
                    }
                } catch (error_obj) {
                    this.log_error(error_obj, 'shr_1180');
                }
            });
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1022');
        }
    };

    public storage_get = async (keys?: string | string[]): Promise<any> => {
        try {
            const data_sync: t.AnyRecord = await we.storage.sync.get(keys);

            if (n(data_sync)) {
                return data_sync;
            }

            const data_local: t.AnyRecord = await we.storage.local.get(keys);

            return data_local;
        } catch (error_obj) {
            this.log_error(error_obj, 'shr_1023');
        }

        return undefined;
    };

    public storage_set = async (obj: t.AnyRecord): Promise<void> => {
        try {
            const data_local: t.AnyRecord = await we.storage.local.get();

            if (n(data_local)) {
                const merged_data: t.AnyRecord = _.merge(data_local, obj);

                await we.storage.sync.set(merged_data);
            } else {
                await we.storage.sync.set(obj);
            }

            await we.storage.local.clear();
        } catch (error_obj) {
            const data_sync: t.AnyRecord = await we.storage.sync.get();

            if (n(data_sync)) {
                await we.storage.local.set(data_sync);
                await we.storage.sync.clear();
            }

            await we.storage.local.set(obj);
        }
    };

    public inject_js_and_css_in_content_script = async (
        js_file_paths: string[],
        css_file_paths: string[],
    ): Promise<void> => {
        await this.iterate_all_tabs(async (tab: browser.tabs.Tab) => {
            try {
                if (n(tab.id)) {
                    const already_injected_script_func = () =>
                        document.title.includes(
                            '\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b',
                        );

                    const result = await (we as any).scripting.executeScript({
                        function: already_injected_script_func,
                        target: { tabId: tab.id },
                    });

                    const already_injected_script: boolean = result[0].result;

                    if (!already_injected_script) {
                        js_file_paths.forEach((file_path: string): void => {
                            try {
                                (we as any).scripting.executeScript({
                                    target: { tabId: tab.id },
                                    files: [file_path],
                                });
                            } catch (error_obj) {
                                this.log_error(error_obj, 'shr_1186');
                            }
                        });

                        css_file_paths.forEach((file_path: string): void => {
                            try {
                                (we as any).scripting.insertCSS({
                                    target: { tabId: tab.id },
                                    files: [file_path],
                                });
                            } catch (error_obj) {
                                this.log_error(error_obj, 'shr_1187');
                            }
                        });
                    }
                }
            } catch (error_obj) {
                this.log_error(error_obj, 'shr_1184');
            }
        });
    };
}
