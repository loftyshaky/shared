import { s_viewport } from 'shared_clean/internal';

class Class {
    private static instance: Class;

    public static get_instance(): Class {
        return this.instance || (this.instance = new this());
    }

    // eslint-disable-next-line no-useless-constructor, no-empty-function
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
                const fill_shadow_w = ws.map(
                    (item): HTMLSpanElement =>
                        err(
                            () =>
                                sb(
                                    item.parentElement as HTMLSpanElement,
                                    '.fill_shadow_w',
                                ) as HTMLSpanElement,
                            'shr_1040',
                        ),
                );

                const fill_shadows = fill_shadow_w.map((item) =>
                    err(
                        () => sb<HTMLSpanElement>(item, '.fill_shadow') as HTMLSpanElement,
                        'shr_1041',
                    ),
                );

                ws.forEach((item, i: number): void =>
                    err(() => {
                        let visualization: HTMLButtonElement | undefined;
                        const color_picker_from_palette = x.closest<HTMLDivElement>(
                            ws[i],
                            '.palette',
                        );

                        if (n(color_picker_from_palette)) {
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
                            fill_shadow_w[i].style.top = '';
                            fill_shadow_w[i].style.left = '';

                            const get_scroll_offset = ({ scroll }: { scroll: number }): number =>
                                color_picker_from_palette ? 0 : scroll;

                            const remove_double_minus = ({ val }: { val: string }): string =>
                                val.replace(/--/, '');

                            const scroll_container = s<HTMLDivElement>('.sections:not(.custom)');
                            const scroll_container_final: HTMLElement = n(scroll_container)
                                ? scroll_container
                                : document.documentElement;

                            if (n(scroll_container_final)) {
                                const fill_shadow_w_rect = fill_shadow_w[i].getBoundingClientRect();
                                const fill_shadow_rect = fill_shadows[i].getBoundingClientRect();
                                const visualization_height: number = visualization.offsetHeight;
                                const visualization_width: number = visualization.offsetWidth;
                                const scroll_top: number = scroll_container_final.scrollTop;
                                const scroll_left: number = scroll_container_final.scrollLeft;
                                const viewport_width: number = s_viewport.Viewport.get_dim({
                                    dim: 'width',
                                });
                                const viewport_height: number = s_viewport.Viewport.get_dim({
                                    dim: 'height',
                                });

                                scroll_container_final.scrollTop = scroll_top;
                                scroll_container_final.scrollLeft = scroll_left;

                                const target_fit_to_display_below_visualization: boolean =
                                    Math.ceil(
                                        fill_shadow_w_rect.top +
                                            fill_shadow_rect.height +
                                            (visualization_height -
                                                this.gap_between_visualization_and_color_picker),
                                    ) <= viewport_height;
                                const target_fit_to_display_above_visualization: boolean =
                                    Math.floor(
                                        fill_shadow_w_rect.top -
                                            (visualization_height +
                                                this.gap_between_visualization_and_color_picker *
                                                    2 +
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
                                    fill_shadow_w[i].style.top = ws[i].style.top;
                                } else {
                                    ws[i].style.top = remove_double_minus({
                                        val: `-${
                                            get_scroll_offset({ scroll: scroll_top }) -
                                            (this.gap_between_visualization_and_color_picker +
                                                visualization_height)
                                        }px`,
                                    });
                                    fill_shadow_w[i].style.top = ws[i].style.top;
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
                                    fill_shadow_w[i].style.left = ws[i].style.left;
                                } else {
                                    ws[i].style.left = `-${get_scroll_offset({
                                        scroll: scroll_left,
                                    })}px`;
                                    fill_shadow_w[i].style.left = ws[i].style.left;
                                }
                            }
                        }
                    }, 'shr_1042'),
                );
            }
        }, 'shr_1043');
}

export const Position = Class.get_instance();
