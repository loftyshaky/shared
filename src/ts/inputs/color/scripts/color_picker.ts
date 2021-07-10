import { runInAction } from 'mobx';
import Pickr from '@simonwep/pickr';

import { t } from 'shared/internal';
import { o_color, d_color, i_color } from 'inputs/internal';

export class ColorPicker {
    private static i0: ColorPicker;

    public static i(): ColorPicker {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public setting_color: boolean = false;

    public init = ({
        input,
        i,
        color_picker,
        visualization,
    }: {
        input: o_color.Color;
        i: i_color.I;
        color_picker: HTMLSpanElement;
        visualization: HTMLButtonElement;
    }): t.AnyRecord =>
        err(() => {
            const pickr: t.AnyRecord = new Pickr({
                container: color_picker,
                el: visualization,
                theme: 'monolith',
                default: '#fff',
                useAsButton: true,
                autoReposition: false,
                lockOpacity: true,
                showAlways: true,
                components: {
                    palette: true,
                    preview: true,
                    hue: true,
                    interaction: {
                        hex: true,
                        rgba: true,
                        hsva: true,
                        hsla: true,
                        input: true,
                        save: true,
                    },
                },
                i18n: {
                    'btn:save': 'OK',
                },
            });

            pickr.on('save', () =>
                err(() => {
                    if (!this.setting_color) {
                        d_color.Color.i().save({
                            i,
                            input,
                        });
                    }
                }, 'shr_1143'),
            );

            pickr.on('change', (pickr_color: t.AnyRecord) =>
                err(() => {
                    if (
                        n(input.state) &&
                        input.state[i as keyof i_color.ColorPickerState].is_visible
                    ) {
                        d_color.Color.i().set({
                            input,
                            i,
                            color: d_color.Color.i().convert_pickr_color_to_rgb_string({
                                pickr_color,
                            }),
                        });
                    }
                }, 'shr_1144'),
            );

            return pickr;
        }, 'shr_1002');

    public update = ({
        pickr,
        color_picker,
        input,
        i,
    }: {
        pickr: t.AnyRecord;
        color_picker: HTMLSpanElement;
        input: o_color.Color;
        i: i_color.I;
    }): Promise<void> =>
        err_async(async () => {
            if (n(input.state) && input.state[i as keyof i_color.ColorPickerState].is_visible) {
                await x.delay(50);

                this.setting_color = true;

                const color: string = d_color.Color.i().access({
                    input,
                    i,
                });

                pickr.setColor(color === '' ? '#fff' : color);

                this.setting_color = false;

                pickr.setColorRepresentation('HSVA');

                runInAction(() =>
                    err(() => {
                        input.color_picker_width = color_picker.offsetWidth.toString();
                        input.color_picker_height = color_picker.offsetHeight.toString();
                    }, 'shr_1153'),
                );
            }
        }, 'shr_1003');
}
