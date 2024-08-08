class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
    private constructor() {}

    public set = (): void =>
        err(() => {
            const title_el = s<HTMLTitleElement>('title');

            if (n(title_el)) {
                const title = ext.msg(`${page}_title_text`);

                title_el.textContent =
                    page === 'announcement' ? `${we.runtime.getManifest().name} - ${title}` : title;
            }
        }, 'shr_1229');
}

export const Title = Class.get_instance();
