import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { ShipmentsPage } from './views/ShipmentsPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
export const App: FunctionComponent = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route
                    path="/shipments/:companyName"
                    element={<ShipmentsPage />}
                />
            </Routes>
            <ShipmentsPage />
        </QueryClientProvider>
    );
};
