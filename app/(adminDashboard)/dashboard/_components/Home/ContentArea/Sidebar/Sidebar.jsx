'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaBlog, 
  FaRegImage, 
  FaVideo, 
  FaQuoteRight, 
  FaTachometerAlt,
  FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext';


export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard/overview' },
    { id: 'blogs', label: 'Blogs', icon: <FaBlog />, path: '/dashboard/blogs' },
    { id: 'images', label: 'Photo Gallery', icon: <FaRegImage />, path: '/dashboard/images' },
    { id: 'videos', label: 'Video Gallery', icon: <FaVideo />, path: '/dashboard/videos' },
    { id: 'testimonials', label: 'Testimonials', icon: <FaQuoteRight />, path: '/dashboard/testimonials' },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const isActive = (path) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true;
    if (path !== '/dashboard' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-20">
      {/* Logo Area */}
      <Link href="/dashboard" className="p-5 border-b border-gray-200 hover:bg-gray-50 transition">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ff9100] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="font-semibold text-gray-900 text-lg">Nortway CMS</span>
        </div>
      </Link>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-[#ff9100] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}