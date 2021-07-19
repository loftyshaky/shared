export class Tabs {
    private static i0: Tabs;

    public static i(): Tabs {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public keep_long = (): void =>
        err(() => {
            we.tabs.onUpdated.addListener((tab_id: number): void =>
                err(() => {
                    we.tabs.connect(tab_id);
                }, 'shr_1113'),
            );
        }, 'shr_1114');

    public add_on_connect_listener = (): void =>
        err(() => {
            we.runtime.onConnect.addListener(() => undefined);
        }, 'shr_1115');
}
