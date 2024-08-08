class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
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

export const UploadBox = Class.get_instance();
