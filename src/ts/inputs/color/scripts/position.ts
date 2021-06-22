import { Viewport } from 'shared/internal';

export class Position {
    private static i0: Position;

    public static i(): Position {
        // eslint-disable-next-line no-return-assign
        return this.i0 || (this.i0 = new this());
    }

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    private gap_between_visualization_and_color_picker: number = 8;

    public set = (): void =>
        err(() => {
            const ws = Array.from(
                sab<HTMLDivElement | HTMLSpanElement>(
                    document,
                    '.palette_w.opacity_1, .color_picker_w.opacity_1',
                ) || [],
            );

            if (ws.length !== 0) {
                const fill_shadows_w = ws.map(
                    (item): HTMLSpanElement => item.previousElementSibling as HTMLSpanElement,
                );
                const fill_shadows = fill_shadows_w.map(
                    (item) => sb<HTMLSpanElement>(item, '.fill_shadow') as HTMLSpanElement,
                );

                ws.forEach(async (item, i: number): Promise<void> => {
                    let visualization: HTMLButtonElement | undefined;
                    const color_picker_from_palette = x.closest<HTMLDivElement>(ws[i], '.palette');

                    if (color_picker_from_palette) {
                        const palette_visualization_w = x.closest<HTMLSpanElement>(
                            ws[i],
                            '.palette_visualization_w',
                        );

                        if (palette_visualization_w) {
                            visualization = sb<HTMLButtonElement>(
                                palette_visualization_w,
                                '.palette_visualization',
                            );
                        }
                    } else {
                        const input_w = x.closest<HTMLDivElement>(ws[i], '.input_w');

                        if (input_w) {
                            visualization = sb<HTMLButtonElement>(
                                input_w,
                                '.visualization:not(.palette_visualization)',
                            );
                        }
                    }

                    if (n(visualization)) {
                        fill_shadows_w[i].style.top = '';
                        fill_shadows_w[i].style.left = '';

                        const get_scroll_offset = ({ scroll }: { scroll: number }): number =>
                            color_picker_from_palette ? 0 : scroll;

                        const remove_double_minus = ({ val }: { val: string }): string =>
                            val.replace(/--/, '');

                        const scroll_container = s<HTMLDivElement>('.sections');

                        if (n(scroll_container)) {
                            const fill_shadow_w_rect = fill_shadows_w[i].getBoundingClientRect();
                            const fill_shadow_rect = fill_shadows[i].getBoundingClientRect();
                            const visualization_height: number = visualization.offsetHeight;
                            const visualization_width: number = visualization.offsetWidth;
                            const scroll_top: number = scroll_container.scrollTop;
                            const scroll_left: number = scroll_container.scrollLeft;
                            const viewport_width: number = Viewport.i().get_dim({ dim: 'width' });
                            const viewport_height: number = Viewport.i().get_dim({ dim: 'height' });

                            scroll_container.scrollTop = scroll_top;
                            scroll_container.scrollLeft = scroll_left;

                            // target = palette_or_color_picker

                            const target_fit_to_display_below_visualization: boolean =
                                Math.ceil(fill_shadow_w_rect.top + fill_shadow_rect.height) <=
                                viewport_height;
                            const target_fit_to_display_above_visualization: boolean =
                                Math.floor(
                                    fill_shadow_w_rect.top -
                                        (visualization_height +
                                            this.gap_between_visualization_and_color_picker * 2 +
                                            fill_shadow_rect.height),
                                ) >= 0;

                            const target_fit_to_display_to_the_right_of_visualization: boolean =
                                Math.floor(fill_shadow_w_rect.left + fill_shadow_rect.width) <=
                                viewport_width;
                            const target_fit_to_display_to_the_left_of_visualization: boolean =
                                Math.floor(
                                    fill_shadow_w_rect.left -
                                        fill_shadow_rect.width +
                                        visualization_width,
                                ) >= 0;

                            if (
                                !target_fit_to_display_below_visualization &&
                                target_fit_to_display_above_visualization
                            ) {
                                ws[i].style.top = `-${
                                    get_scroll_offset({ scroll: scroll_top }) +
                                    this.gap_between_visualization_and_color_picker +
                                    fill_shadow_rect.height
                                }px`;
                                fill_shadows_w[i].style.top = ws[i].style.top;
                            } else {
                                ws[i].style.top = remove_double_minus({
                                    val: `-${
                                        get_scroll_offset({ scroll: scroll_top }) -
                                        (this.gap_between_visualization_and_color_picker +
                                            visualization_height)
                                    }px`,
                                });
                                fill_shadows_w[i].style.top = ws[i].style.top;
                            }

                            if (
                                !target_fit_to_display_to_the_right_of_visualization &&
                                target_fit_to_display_to_the_left_of_visualization
                            ) {
                                ws[i].style.left = remove_double_minus({
                                    val: `-${
                                        get_scroll_offset({ scroll: scroll_left }) -
                                        (visualization_width - fill_shadow_rect.width)
                                    }px`,
                                });
                                fill_shadows_w[i].style.left = ws[i].style.left;
                            } else {
                                ws[i].style.left = `-${get_scroll_offset({
                                    scroll: scroll_left,
                                })}px`;
                                fill_shadows_w[i].style.left = ws[i].style.left;
                            }
                        }
                    }
                });
            }
        }, 's1032');
}
