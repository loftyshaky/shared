class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    public hide_roots = ({ app_id }: { app_id: string }): void =>
        err(() => {
            x.css('hidden_roots', document.head, `hidden_roots_link_${app_id}`);
        }, 'shr_1235');

    public show_roots = ({ app_id }: { app_id: string }): void =>
        err(() => {
            x.remove(s<HTMLLinkElement>(`.hidden_roots_link_${app_id}`));
        }, 'shr_1236');
}

export const Roots = Class.get_instance();
