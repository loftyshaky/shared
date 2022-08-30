import { makeObservable, observable, action } from 'mobx';

export class Visibility {
    private static i0: Visibility;

    public static i(): Visibility {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable(this, {
            flash_is_visible: observable,
            hide_flash: action,
        });
    }

    public flash_is_visible: boolean = true;
    public prevent_flash_hiding: boolean = false;

    public hide_flash = (): void =>
        err(() => {
            this.flash_is_visible = false;
        }, 'shr_1248');

    public hide_flash_with_delay = ({ delay }: { delay: number }): Promise<void> =>
        err_async(async () => {
            await x.delay(delay);

            if (!this.prevent_flash_hiding) {
                this.hide_flash();
            }
        }, 'shr_1247');

    public cancel_flash_hide = (): void =>
        err(() => {
            this.prevent_flash_hiding = true;
        }, 'shr_1251');
}
