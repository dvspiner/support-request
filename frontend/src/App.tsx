import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

import DashboardLayout from './layouts/DashboardLayout';
import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
        </QueryClientProvider>
    );
};

export default App;