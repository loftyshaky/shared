import { minify } from 'html-minifier-terser';

export const minify_html = async ({ mode, contents }: { mode: string; contents: string }) => {
    if (mode === 'development') {
        return contents;
    }

    const minified_html: string = await minify(contents, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
    });

    return minified_html;
};
