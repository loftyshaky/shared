import { makeObservable, action, observable, computed } from 'mobx';

export class State {
    private static i0: State;

    public static i(): State {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<State, 'is_visible' | 'is_highlighted'>(this, {
            is_loaded: observable,
            is_visible: observable,
            is_highlighted: observable,
            is_visible_cls: computed,
            is_highlighted_cls: computed,
            change_state: action,
        });
    }

    [index: string]: any;

    public is_loaded: boolean = false;
    private is_visible: boolean = false;
    private is_highlighted: boolean = false; // true = error ribbon is yellow / false = error ribbon is red

    public get is_visible_cls(): string {
        return this.is_visible ? '' : 'none';
    }

    public get is_highlighted_cls(): string {
        return this.is_highlighted ? 'is_highlighted' : '';
    }

    private is_visible_timeout: number = 0;
    private is_highlighted_timeout: number = 0;

    public change_state = ({
        observable_key,
        state,
    }: {
        observable_key: string;
        state: boolean;
    }): void => {
        // show or hide / highlight dehighlight error ribbon
        this[observable_key] = state;
    };

    public run_reset_state_timeout = ({
        observable_key,
        delay,
    }: {
        observable_key: string;
        delay: number;
    }): void => {
        this[`${observable_key}_timeout`] = global.setTimeout((): void => {
            this.change_state({
                observable_key,
                state: false,
            }); // hide error ribbon / dehighlight error ribbon
        }, delay);
    };

    public clear_all_reset_state_timeouts = (): void => {
        clearTimeout(this.is_visible_timeout);
        clearTimeout(this.is_highlighted_timeout);
    };
}
