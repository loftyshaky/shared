import type { Target } from 'vite-plugin-static-copy';

import fs from 'fs-extra';
import { isEmptyDirSync } from 'is-empty-dir';

const generate_vite_plugin_static_copy_items = ({ copy_paths }: { copy_paths: Target[] }) =>
    copy_paths.flatMap((copy_path: Target): Target[] => {
        try {
            if (fs.lstatSync(copy_path.src as string).isDirectory()) {
                isEmptyDirSync(copy_path.src);
            }

            return [copy_path];
        } catch {
            return [];
        }
    });

export { generate_vite_plugin_static_copy_items };
