import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-blue-600 text-white p-4 text-center">
                <h1 className="text-xl">Dashboard</h1>
                {/* You can add your user profile, notifications, etc., here */}
            </header>
            <div className="flex flex-1">
                <nav className="bg-gray-200 w-64 p-4">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/dashboard" className="text-blue-600 hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/profile" className="text-blue-600 hover:underline">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/settings" className="text-blue-600 hover:underline">
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" className="text-blue-600 hover:underline">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
                <main className="flex-1 p-6 bg-white shadow-md">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;