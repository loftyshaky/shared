import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { s_dependencies } from 'dependencies/internal';
import { s_title } from 'shared_clean/internal';

export const Body: React.FunctionComponent = observer(() => {
    useEffect(() => {
        void s_dependencies.Dependencies.generate_dependencies_text_from_depengencies_json();
    }, []);

    return (
        <div className='main'>
            <h1 className='header'>{s_title.Title.get()}</h1>
            <div
                className='dependencies'
                dangerouslySetInnerHTML={{
                    __html: s_dependencies.Dependencies.dependencies_text,
                }}
            />
        </div>
    );
});
