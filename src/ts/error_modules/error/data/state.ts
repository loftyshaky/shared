import { makeObservable, observable, computed, action } from 'mobx';

import { i_error } from 'error_modules_clean/internal';
import { d_error } from 'error_modules/internal';

export class State {
    private static i0: State;

    public static i(): State {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<State, 'is_loaded' | 'is_visible' | 'is_highlighted'>(this, {
            is_loaded: observable,
            is_visible: observable,
            is_highlighted: observable,
            is_fullscreen: observable,
            notification_type: observable,
            is_visible_style: computed,
            is_highlighted_cls: computed,
            change_state: action,
            run_reset_state_timeout: action,
        });
    }

    private is_loaded: boolean = false;
    private is_visible: boolean = false;
    private is_highlighted: boolean = false; // true = error ribbon is yellow / false = error ribbon is red
    public is_fullscreen: boolean = false;
    public notification_type: i_error.NotificationType = 'error';

    public get is_visible_style(): string {
        return this.is_loaded && this.is_visible ? '' : 'none';
    }

    public get is_highlighted_cls(): string {
        return this.is_highlighted ? 'is_highlighted' : '';
    }

    public get is_fullscreen_cls(): string {
        return this.is_fullscreen ? 'fullscreen' : '';
    }

    private is_visible_timeout: ReturnType<typeof setTimeout> | undefined;
    private is_highlighted_timeout: ReturnType<typeof setTimeout> | undefined;

    public change_state = ({
        observable_key,
        state,
    }: {
        observable_key: i_error.ObservableKeys;
        state: boolean;
    }): void => {
        this[observable_key as i_error.ObservableKeys] = state;
    };

    public run_reset_state_timeout = ({
        observable_key,
        delay,
    }: {
        observable_key: i_error.ObservableKeys;
        delay: number;
    }): void => {
        this[`${observable_key}_timeout` as i_error.TimeoutObservableKeys] = globalThis.setTimeout(
            (): void => {
                this.change_state({
                    observable_key,
                    state: false,
                }); // hide error ribbon / dehighlight error ribbon
            },
            delay,
        );

        if (observable_key === 'is_visible') {
            d_error.Progress.i().begin_progress({ error_hide_delay: delay });
        }
    };

    public clear_all_reset_state_timeouts = (): void => {
        if (n(this.is_visible_timeout) && n(this.is_highlighted_timeout)) {
            clearTimeout(this.is_visible_timeout);
            clearTimeout(this.is_highlighted_timeout);

            d_error.Progress.i().hide_progress();
        }
    };
}
