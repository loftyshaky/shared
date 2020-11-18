import {
    configure,
    action,
    observable,
    computed,
} from 'mobx';

configure({ enforceActions: 'observed' });

export class State {
    private static i0: State;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    [index: string]: any;

    @observable public is_loaded: boolean = false;
    @observable private is_visible: boolean = false;
    @observable private is_highlighted: boolean = false; // true = error ribbon is yellow / false = error ribbon is red

    @computed public get is_visible_cls(): string {
        return this.is_visible
            ? ''
            : 'none';
    }

    @computed public get is_highlighted_cls(): string {
        return this.is_highlighted
            ? 'is_highlighted'
            : '';
    }

    private is_visible_timeout: number = 0;
    private is_highlighted_timeout: number = 0;

    @action public change_state = ({
        observable_key,
        state,
    }: {
        observable_key: string;
        state: boolean;
    }): void => { // show or hide / highlight dehighlight error ribbon
        this[observable_key] = state;
    }

    public run_reset_state_timeout = ({
        observable_key,
        delay,
    }: {
        observable_key: string;
        delay: number;
    }): void => {
        this[`${observable_key}_timeout`] = window.setTimeout((): void => {
            this.change_state({
                observable_key,
                state: false,
            }); // hide error ribbon / dehighlight error ribbon
        },
        delay);
    };

    public clear_all_reset_state_timeouts = (): void => {
        clearTimeout(this.is_visible_timeout);
        clearTimeout(this.is_highlighted_timeout);
    };
}
