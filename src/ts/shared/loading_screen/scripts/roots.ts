export class Roots {
    private static i0: Roots;

    public static i(): Roots {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public hide_roots = ({ app_id }: { app_id: string }): void =>
        err(() => {
            x.css('hidden_roots', document.head, `hidden_roots_link_${app_id}`);
        }, 'shr_1235');

    public show_roots = ({ app_id }: { app_id: string }): void =>
        err(() => {
            x.remove(s<HTMLLinkElement>(`.hidden_roots_link_${app_id}`));
        }, 'shr_1235');
}
