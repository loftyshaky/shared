import { makeObservable, observable, computed, action, autorun } from 'mobx';

export class Progress {
    private static i0: Progress;

    public static i(): Progress {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    private constructor() {
        makeObservable<this, 'increment_progress'>(this, {
            progress_val: observable,
            progress_bar_is_visible_cls: computed,
            begin_progress: action,
            increment_progress: action,
            hide_progress: action,
        });
    }

    public progress_max: number = 100;
    public progress_val: number = 100;
    private timestamp_progress_begin: number = 0;
    private error_hide_delay: number = 0;
    private progress_timeout: ReturnType<typeof setTimeout> | undefined;

    public get progress_bar_is_visible_cls(): string {
        return this.progress_val >= this.progress_max ? 'none' : '';
    }

    public begin_progress = ({ error_hide_delay }: { error_hide_delay: number }): void => {
        this.error_hide_delay = error_hide_delay;
        this.timestamp_progress_begin = Date.now();
        this.progress_val = 0;
    };

    private increment_progress = (): void => {
        const progress_percentage: number =
            (100 * (Date.now() - this.timestamp_progress_begin)) / this.error_hide_delay;

        this.progress_val = progress_percentage;
    };

    public hide_progress = (): void => {
        clearTimeout(this.progress_timeout);

        this.progress_val = this.progress_max;
    };

    public update_progress_autorun = (): void => {
        autorun(() => {
            const progress_val_is_maxed: boolean = this.progress_val >= this.progress_max;

            if (!progress_val_is_maxed) {
                this.progress_timeout = setTimeout(() => {
                    this.increment_progress();
                }, 10);
            }
        });
    };
}
