import { ComposeProviders } from '../providers/compose-providers';
import { AppRouter } from '../routes';

import '../styles/index.css';

const App = () => {
    return (
        <ComposeProviders>
            <AppRouter />
        </ComposeProviders>
    );
};

export { App };
