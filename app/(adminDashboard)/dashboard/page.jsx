import React from 'react';
import Sidebar from './_components/Home/ContentArea/Sidebar/Sidebar';
import Topbar from './_components/Home/ContentArea/Topbar/Topbar';
import ProtectedRoute from './_components/utilities/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 relative">
        <Sidebar />
        <Topbar />
        <main className="pt-20 pb-6 px-6 ml-64">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}