class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
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

export const Roots = Class.get_instance();
