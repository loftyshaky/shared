import { runInAction } from 'mobx';
import Pickr from '@simonwep/pickr';

import {
    o_color,
    d_color,
    i_color,
} from 'inputs/internal';

export class ColorPicker {
    private static i0: ColorPicker;

    public static get i() {
        if (!this.i0) { this.i0 = new this(); }

        return this.i0;
    }

    public setting_color: boolean = false;

    public init = (
        {
            input,
            i,
            color_picker,
            visualization,
        }: {
            input: o_color.Color;
            i: i_color.I;
            color_picker: HTMLSpanElement;
            visualization: HTMLButtonElement
        },
    ): void => err(() => {
        const pickr: any = new Pickr({
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

        pickr.on('save',
            () => {
                if (!this.setting_color) {
                    d_color.Color.i.save({
                        i,
                        input,
                    });
                }
            });

        pickr.on('change',
            (color: any) => {
                if (input.state[i].is_visible) {
                    d_color.Color.i.set({
                        input,
                        i,
                        color: d_color.Color.i.convert_pickr_color_to_rgb_string(
                            { pickr_color: color },
                        ),
                    });
                }
            });

        return pickr;
    },
    's1042');

    public update = ({
        pickr,
        color_picker,
        input,
        i,
    }: {
        pickr: any;
        color_picker: HTMLSpanElement;
        input: o_color.Color;
        i: i_color.I;
    }): Promise<void> => err_async(async () => {
        if (input.state[i].is_visible) {
            await x.delay(0);

            this.setting_color = true;

            pickr.setColor(d_color.Color.i.access({
                input,
                i,
            }));

            this.setting_color = false;

            pickr.setColorRepresentation('HSVA');

            runInAction((): void => {
                input.color_picker_width = color_picker.offsetWidth;
                input.color_picker_height = color_picker.offsetHeight;
            });
        }
    },
    '1043');
}
