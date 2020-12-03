export class NoTr {
    private static i0: NoTr;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    private cls: string = 'no_tr';

    public enable = ({ el = document.head }: { el?: HTMLElement }): void => err(() => {
        x.css(
            this.cls,
            el,
        );
    },
    's1020');

    public disable = (
        { el = document.head }: { el?: HTMLElement },
    ): Promise<void> => err(async () => {
        await x.delay(500);

        const tr_link = sb<HTMLLinkElement>(
            el,
            `.${this.cls}_link`,
        );

        x.remove(tr_link);
    },
    's1021');
}
