import { makeObservable, action } from 'mobx';

import { i_optional_permissions } from 'settings/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        makeObservable<Class, 'set_checkbox_val'>(this, {
            set_checkbox_val: action,
        });
    }

    public set = ({
        name,
        optional_permission_checkbox_dict,
        set_checkbox_val = true,
    }: {
        name: string;
        optional_permission_checkbox_dict: i_optional_permissions.OptionalPermissionCheckboxDict;
        set_checkbox_val?: boolean;
    }): Promise<boolean> =>
        err_async(async () => {
            const permissions = optional_permission_checkbox_dict[name];

            const contains_permission: boolean = await we.permissions.contains(permissions);

            if (contains_permission) {
                const removed: boolean = await we.permissions.remove(permissions);

                if (set_checkbox_val && removed) {
                    this.set_checkbox_val({ name, val: false });
                }
            } else {
                const granted: boolean = await we.permissions.request(permissions);

                if (set_checkbox_val && granted) {
                    this.set_checkbox_val({ name, val: true });
                }

                return granted;
            }

            return false;
        }, 'shr_1221');

    private set_checkbox_val = ({ name, val }: { name: string; val: boolean }): void =>
        err(() => {
            data.ui[name] = val;
        }, 'shr_1222');

    public show_enable_permissions_notification = ({
        permissions,
    }: {
        permissions: i_optional_permissions.ShowEnablePermissionsNotificationPermission[];
    }): Promise<void> =>
        err_async(async () => {
            const permissions_text = await permissions.reduce(
                async (
                    previous_val_promise: Promise<string>,
                    permission: i_optional_permissions.ShowEnablePermissionsNotificationPermission,
                    i: number,
                ): Promise<string> => {
                    const previous_val = await previous_val_promise;
                    const contains_permission: boolean = await we.permissions.contains(
                        permission.permission,
                    );
                    const permission_text: string =
                        !contains_permission &&
                        data.settings.prefs[`${x.camel_to_underscore(permission.name)}_permission`]
                            ? permission.name
                            : '';

                    return i === 0
                        ? `[${permission_text}]`
                        : `${previous_val}, [${permission_text}]`;
                },
                Promise.resolve(''),
            );

            const at_least_one_permission_need_to_be_enabled: boolean = permissions_text !== '[]';

            if (at_least_one_permission_need_to_be_enabled) {
                show_notification({
                    alt_msg: `${ext.msg('backup_permissions_start_notification')}${permissions_text}${ext.msg('backup_permissions_end_notification')}`,
                    hide_delay: 30000,
                });
            }
        }, 'shr_1301');
}

export const Permission = Class.get_instance();
