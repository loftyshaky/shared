export class ServiceWorker {
    private static i0: ServiceWorker;

    public static i(): ServiceWorker {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private make_persistent_intervals: ReturnType<typeof setInterval>[] = [];
    private persistent_service_worker: boolean = false;

    public make_persistent = async (): Promise<void> =>
        err_async(async () => {
            this.clear_make_persistent_intervals();

            const settings = await ext.storage_get();
            this.persistent_service_worker = settings.persistent_service_worker;

            this.make_persistent_intervals.push(
                setInterval(() => {
                    err_async(async () => {
                        if (this.persistent_service_worker) {
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
