import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Support Request</h1>
            </header>
            <main className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                {children}
            </main>
            <footer className="mt-4 text-sm">
                <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </footer>
        </div>
    );
};

export default AuthLayout;