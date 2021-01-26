export class Main {
    private static i0: Main;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public page_is_crashed: boolean = false; // true = shows reload ui screen

    public reload_page = (): void => {
        window.location.reload();
    };
}
