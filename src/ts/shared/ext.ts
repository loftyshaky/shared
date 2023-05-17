// Allowing send_msg functions to throw errors (red) makes extension freeze when sending message to tab without onMessage event listrener!
// Not using err/err_async because it causes infinite loop in content script and freezing when you disable/reload extension!

import _ from 'lodash';
import { browser, Windows, Tabs } from 'webextension-polyfill-ts';

import { d_error } from 'error_modules/internal';
import { t } from 'shared/internal';

declare const globalThis: Global;

declare global {
    const we: typeof browser;
}

globalThis.we = browser;

export const init_page = (): void =>
    err(() => {
        const title = globalThis.document ? document.querySelector('title') : undefined;

        if (['https:', 'http:'].includes(globalThis.location.protocol)) {
            globalThis.page = 'content_script';
        } else {
            globalThis.page = n(title) && n(title.dataset.page) ? title.dataset.page : 'background';
        }
    }, 'shr_1093');

globalThis.misplaced_dependency = (culprit_page: string): void =>
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
    }, 'shr_1094');

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

    public get_app_version = (): string => {
        try {
            return we.runtime.getManifest().version;
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1095');
        }

        return '';
    };

    public iterate_all_tabs = async (callback: t.CallbackVariadicVoid): Promise<void> => {
        try {
            const windows: Windows.Window[] = await we.windows.getAll({
                populate: true,
                windowTypes: ['normal'],
            });

            windows.forEach((win: Windows.Window): void => {
                if (n(win.tabs)) {
                    win.tabs.forEach((tab: Tabs.Tab): void => {
                        if (n(tab.id)) {
                            callback(tab);
                        }
                    });
                }
            });
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1096');
        }
    };

    public msg = (msg: string): string => {
        try {
            const msg_2: string | undefined = n(we.i18n.getMessage) ? we.i18n.getMessage(msg) : '';

            return n(msg_2) ? msg_2 : '';
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1097');
        }

        return '';
    };

    public get_active_tab = async (): Promise<Tabs.Tab | undefined> => {
        try {
            const tabs: Tabs.Tab[] = await we.tabs.query({
                active: true,
                currentWindow: true,
            });

            return tabs[0];
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1098');
        }

        return undefined;
    };

    public send_msg = async (msg: t.Msg): Promise<void> => {
        try {
            await we.runtime.sendMessage(msg);
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1099');
        }
    };

    public send_msg_resp = async (msg: t.Msg): Promise<any> => {
        try {
            const response = await we.runtime.sendMessage(msg);

            return response;
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1100');
        }

        return undefined;
    };

    public send_msg_to_tab = async (id: number, msg: t.Msg): Promise<void> => {
        try {
            await we.tabs.sendMessage(id, msg);
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1101');
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    public send_msg_to_tab_resp = async (id: number, msg: t.Msg): Promise<any> => {
        try {
            const response = await we.tabs.sendMessage(id, msg);

            return response;
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1102');
        }

        return undefined;
    };

    public send_msg_to_active_tab = async (msg: t.Msg): Promise<void> => {
        try {
            const tab: Tabs.Tab | undefined = await this.get_active_tab();

            if (n(tab) && n(tab.id)) {
                await this.send_msg_to_tab(tab.id, msg);
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1103');
        }
    };

    public send_msg_to_active_tab_resp = async (msg: t.Msg): Promise<any> => {
        try {
            const tab: Tabs.Tab | undefined = await this.get_active_tab();

            if (n(tab) && n(tab.id)) {
                return this.send_msg_to_tab(tab.id, msg);
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1104');
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
                } catch (error_obj: any) {
                    this.log_error(error_obj, 'shr_1105');
                }
            });
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1106');
        }
    };

    public storage_get = async (keys?: string | string[]): Promise<any> => {
        try {
            const data_sync: t.AnyRecord = await we.storage.sync.get(keys);
            const data_local: t.AnyRecord = await we.storage.local.get(keys);

            try {
                if (!_.isEmpty(data_local)) {
                    await we.storage.sync.set(data_local);
                    await we.storage.local.clear();
                }
            } catch (error_obj: any) {
                this.log_error(error_obj, 'shr_1259');
            }

            if (!_.isEmpty(data_sync)) {
                return data_sync;
            }

            return data_local;
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1107');
        }

        return undefined;
    };

    public storage_set = async (obj: t.AnyRecord, replace?: boolean): Promise<void> => {
        try {
            const data_local: t.AnyRecord = await we.storage.local.get();

            if (_.isEmpty(data_local)) {
                await we.storage.sync.set(obj);
            } else {
                const merged_data: t.AnyRecord = n(replace) ? obj : _.merge(data_local, obj);
                await we.storage.sync.set(merged_data);
            }

            await we.storage.local.clear();
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1268');

            const data_sync: t.AnyRecord = await we.storage.sync.get();

            if (!_.isEmpty(data_sync)) {
                await we.storage.local.set(data_sync);
                await we.storage.sync.clear();
            }

            await we.storage.local.set(obj);
        }
    };

    public storage_remove = async (keys: string[]): Promise<void> => {
        try {
            await we.storage.sync.remove(keys);
        } catch (error_obj: any) {
            await we.storage.local.remove(keys);
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
                            } catch (error_obj: any) {
                                this.log_error(error_obj, 'shr_1108');
                            }
                        });

                        css_file_paths.forEach((file_path: string): void => {
                            try {
                                (we as any).scripting.insertCSS({
                                    target: { tabId: tab.id },
                                    files: [file_path],
                                });
                            } catch (error_obj: any) {
                                this.log_error(error_obj, 'shr_1109');
                            }
                        });
                    }
                }
            } catch (error_obj: any) {
                this.log_error(error_obj, 'shr_1110');
            }
        });
    };
}
