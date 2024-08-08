import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { s_title } from 'shared_clean/internal';
import { s_dependencies } from 'dependencies/internal';

export const Body: React.FunctionComponent = observer(() => {
    useEffect(() => {
        s_dependencies.Dependencies.generate_dependencies_text_from_depengencies_json();
    }, []);

    return (
        <div className='main'>
            <h1 className='header'>{s_title.Title.get()}</h1>
            <div
                className='dependencies'
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: s_dependencies.Dependencies.dependencies_text,
                }}
            />
        </div>
    );
});
