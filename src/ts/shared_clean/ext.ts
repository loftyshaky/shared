// Allowing send_msg functions to throw errors (red) makes extension freeze when sending message to tab without onMessage event listrener!
// Not using err/err_async because it causes infinite loop in content script and freezing when you disable/reload extension!

import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import browser, { Windows, Tabs } from 'webextension-polyfill';

import { d_error } from 'error_modules_clean/internal';
import { t } from 'shared_clean/internal';

declare const globalThis: Global;

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

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private force_local_storage: boolean = false;

    public ext_context_invalidated = () => !we.runtime?.id;

    private log_error = (error_obj: Error, error_code: string): void => {
        // eslint-disable-next-line no-console
        d_error.Error.output(error_obj, error_code);
    };

    public get_app_version = (): string => {
        try {
            if (!this.ext_context_invalidated()) {
                return we.runtime.getManifest().version;
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1095');
        }

        return '';
    };

    public get_app_name = (): string => {
        try {
            if (!this.ext_context_invalidated()) {
                return we.runtime.getManifest().name;
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1277');
        }

        return '';
    };

    public iterate_all_tabs = async (callback: t.CallbackVariadicVoid): Promise<void> => {
        try {
            if (!this.ext_context_invalidated()) {
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
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1096');
        }
    };

    public msg = (msg: string): string => {
        try {
            if (!this.ext_context_invalidated()) {
                const msg_2: string | undefined =
                    n(we.i18n) && n(we.i18n.getMessage) ? we.i18n.getMessage(msg) : '';

                return n(msg_2) ? msg_2 : '';
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1097');
        }

        return '';
    };

    public get_active_tab = async (): Promise<Tabs.Tab | undefined> => {
        try {
            if (!this.ext_context_invalidated()) {
                const tabs: Tabs.Tab[] = await we.tabs.query({
                    active: true,
                    currentWindow: true,
                });

                return tabs[0];
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1098');
        }

        return undefined;
    };

    public send_msg = async (msg: t.Msg): Promise<void> => {
        try {
            if (!this.ext_context_invalidated()) {
                await we.runtime.sendMessage(msg);
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1099');
        }
    };

    public send_msg_resp = async (msg: t.Msg): Promise<any> => {
        try {
            if (!this.ext_context_invalidated()) {
                const response = await we.runtime.sendMessage(msg);

                return response;
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1100');
        }

        return undefined;
    };

    public send_msg_to_tab = async (id: number, msg: t.Msg): Promise<void> => {
        try {
            if (!this.ext_context_invalidated()) {
                await we.tabs.sendMessage(id, msg);
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1101');
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    public send_msg_to_tab_resp = async (id: number, msg: t.Msg): Promise<any> => {
        try {
            if (!this.ext_context_invalidated()) {
                const response = await we.tabs.sendMessage(id, msg);

                return response;
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1102');
        }

        return undefined;
    };

    public send_msg_to_active_tab = async (msg: t.Msg): Promise<void> => {
        try {
            if (!this.ext_context_invalidated()) {
                const tab: Tabs.Tab | undefined = await this.get_active_tab();

                if (n(tab) && n(tab.id)) {
                    await this.send_msg_to_tab(tab.id, msg);
                }
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1103');
        }
    };

    public send_msg_to_active_tab_resp = async (msg: t.Msg): Promise<any> => {
        try {
            if (!this.ext_context_invalidated()) {
                const tab: Tabs.Tab | undefined = await this.get_active_tab();

                if (n(tab) && n(tab.id)) {
                    return this.send_msg_to_tab(tab.id, msg);
                }
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1104');
        }

        return undefined;
    };

    public send_msg_to_all_tabs = async (msg: t.Msg): Promise<void> => {
        try {
            if (!this.ext_context_invalidated()) {
                await this.iterate_all_tabs(async (tab: Tabs.Tab) => {
                    try {
                        if (n(tab.id)) {
                            await this.send_msg_to_tab(tab.id, msg);
                        }
                    } catch (error_obj: any) {
                        this.log_error(error_obj, 'shr_1105');
                    }
                });
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1106');
        }
    };

    public force_local_storage_f = () => {
        try {
            this.force_local_storage = true;
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1283');
        }
    };

    public storage_get = async (keys?: string | string[], set: boolean = false): Promise<any> => {
        try {
            if (!this.ext_context_invalidated()) {
                const data_sync: t.AnyRecord = await we.storage.sync.get(keys);
                const data_local: t.AnyRecord = await we.storage.local.get(keys);

                const set_f = (): Promise<void> =>
                    err_async(async () => {
                        try {
                            if (isEmpty(data_local) && this.force_local_storage) {
                                await we.storage.local.set(data_sync);
                                await we.storage.sync.clear();
                            } else if (isEmpty(data_sync) && !this.force_local_storage) {
                                await we.storage.sync.set(data_local);
                                await we.storage.local.clear();
                            }
                        } catch (error_obj: any) {
                            this.log_error(error_obj, 'shr_1259');
                        }
                    }, 'shr_1295');

                if (set) {
                    await set_f();
                }

                if (!isEmpty(data_sync)) {
                    return data_sync;
                }

                return data_local;
            }
        } catch (error_obj: any) {
            this.log_error(error_obj, 'shr_1107');
        }

        return undefined;
    };

    public storage_set = async (obj: t.AnyRecord, replace?: boolean): Promise<void> => {
        if (!this.ext_context_invalidated()) {
            const set_data = async (set_local: boolean): Promise<void> => {
                const data: t.AnyRecord = await we.storage[set_local ? 'sync' : 'local'].get();

                if (replace) {
                    await we.storage[set_local ? 'local' : 'sync'].clear();
                }

                if (isEmpty(data)) {
                    await we.storage[set_local ? 'local' : 'sync'].set(obj);
                } else {
                    const merged_data: t.AnyRecord = n(replace) ? obj : merge(data, obj);
                    await we.storage[set_local ? 'local' : 'sync'].set(merged_data);
                }

                await we.storage[set_local ? 'sync' : 'local'].clear();
            };

            if (this.force_local_storage) {
                await set_data(true);
            } else {
                try {
                    await set_data(false);
                } catch (error_obj: any) {
                    this.log_error(error_obj, 'shr_1268');

                    await set_data(true);
                }
            }
        }
    };

    public storage_remove = async (keys: string[]): Promise<void> => {
        if (!this.ext_context_invalidated()) {
            try {
                await we.storage.local.remove(keys);
                await we.storage.sync.remove(keys);
            } catch (error_obj: any) {
                await we.storage.local.remove(keys);
            }
        }
    };

    public inject_js_and_css_in_content_script = async (
        js_file_paths: string[],
        css_file_paths: string[],
    ): Promise<void> => {
        await this.iterate_all_tabs(async (tab: Tabs.Tab) => {
            try {
                const host_permission_is_present: boolean = n(tab.url);

                if (!this.ext_context_invalidated() && host_permission_is_present) {
                    if (n(tab.id)) {
                        const already_injected_script_func = () =>
                            document.title.includes(
                                '\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b\u200b', // I insert these invisible characters with x.insert_invisible_chars_in_title() in title to check if I've already injected the script
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
                }
            } catch (error_obj: any) {
                this.log_error(error_obj, 'shr_1110');
            }
        });
    };
}

export const Ext = Class.get_instance();
