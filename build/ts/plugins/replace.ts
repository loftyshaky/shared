import type { Plugin } from 'vite';

const replace = ({
    replacements,
    include,
}: {
    replacements: { [key: string]: string };
    include: string[];
}): Plugin => {
    return {
        name: 'custom-replace',
        transform(code, id) {
            const is_target_module = include.some((target_module: string): boolean =>
                id.includes(target_module),
            );

            if (is_target_module) {
                let new_code = code;

                for (const [old, new_str] of Object.entries(replacements)) {
                    const escaped_old = old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    new_code = new_code.replace(new RegExp(escaped_old, 'g'), new_str);
                }

                return {
                    code: new_code,
                    map: null,
                };
            } else {
                return null;
            }
        },
    };
};

const content_sript_csp_policy_error_fix = () =>
    replace({
        replacements: {
            "var root = freeGlobal || freeSelf || Function('return this')();":
                'var root = freeGlobal || freeSelf || globalThis',
        },
        include: ['node_modules/lodash/_root.js'],
    });

export { replace, content_sript_csp_policy_error_fix };
