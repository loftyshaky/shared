import { makeObservable, action } from 'mobx';

import { i_optional_permissions } from 'settings/internal';

export class Main {
    private static i0: Main;

    public static i(): Main {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<Main, 'set_checkbox_val'>(this, {
            set_checkbox_val: action,
        });
    }

    public set_permission = ({
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
}
