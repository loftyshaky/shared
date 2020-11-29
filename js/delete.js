import del from 'del';

import { paths } from './apps';

export class Delete {
    delete_by_path = async () => {
        await del(
            [
                ...paths.eslintrc,
                ...paths.stylelintrc,
            ],
            { force: true },
        );
    }
}
