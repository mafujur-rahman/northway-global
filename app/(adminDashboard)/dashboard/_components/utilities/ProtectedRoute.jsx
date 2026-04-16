'use client';

import { useAuth } from '../Context/AuthContext';
import LoginForm from '../Login/LoginForm';


export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <LoginForm />;
    }

    return children;
}