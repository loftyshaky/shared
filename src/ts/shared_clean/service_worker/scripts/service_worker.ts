class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    private make_persistent_intervals: ReturnType<typeof setInterval>[] = [];
    private persistent_service_worker: boolean = false;

    public make_persistent = async (): Promise<void> =>
        err_async(async () => {
            this.clear_make_persistent_intervals();

            this.make_persistent_intervals.push(
                setInterval(() => {
                    err_async(async () => {
                        if (data.settings.prefs.persistent_service_worker) {
                            ext.get_active_tab();
                        } else {
                            this.clear_make_persistent_intervals();
                        }
                    }, 'shr_1284');
                }, 25000),
            );
        }, 'shr_1285');

    private clear_make_persistent_intervals = (): void =>
        err(() => {
            const make_persistent_intervals = [...this.make_persistent_intervals];

            this.make_persistent_intervals = [];

            make_persistent_intervals.forEach(
                (make_persistent_interval: ReturnType<typeof setInterval>): void =>
                    err(() => {
                        clearInterval(make_persistent_interval);
                    }, 'shr_1287'),
            );
        }, 'shr_1286');
}

export const ServiceWorker = Class.get_instance();
