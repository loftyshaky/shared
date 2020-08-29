import del from 'del';
import { magentaBright } from 'colorette';

import { paths } from './apps';

export class Delete {
    delete_by_path = async () => {
        await del(
            [
                ...paths.eslintrc,
                ...paths.stylelintrc,
                ...paths.node_molules,
            ],
            { force: true },
        );

        // eslint-disable-next-line no-console
        console.log(magentaBright('Deleted @loftyshaky/shared'));
    }
}
