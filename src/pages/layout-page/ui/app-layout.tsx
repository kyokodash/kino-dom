import { Outlet } from 'react-router';
import { Footer, Header } from '@widgets/common';

const AppLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export { AppLayout };
