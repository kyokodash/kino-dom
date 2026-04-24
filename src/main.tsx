import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/root/app.tsx';
import { ComposeProviders } from './app/providers/compose-providers.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ComposeProviders>
            <App />
        </ComposeProviders>
    </StrictMode>
);
