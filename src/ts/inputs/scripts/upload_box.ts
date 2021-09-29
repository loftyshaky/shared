export class UploadBox {
    private static i0: UploadBox;

    public static i(): UploadBox {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public trigger_click_on_file_input = ({
        file_input,
    }: {
        file_input: HTMLInputElement | null;
    }): void =>
        err(() => {
            if (n(file_input)) {
                file_input.click();
            }
        }, 'shr_1198');
}
