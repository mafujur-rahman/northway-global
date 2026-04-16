// components/dashboard/Topbar.jsx
'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaBell, FaSearch, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

// Separate Change Password Modal Component
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getAuthToken = () => localStorage.getItem('auth_token');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!passwordData.old_password) errors.old_password = 'Current password is required';
    if (!passwordData.new_password) errors.new_password = 'New password is required';
    if (passwordData.new_password.length < 3) errors.new_password = 'Password must be at least 3 characters';
    if (!passwordData.confirm_password) errors.confirm_password = 'Please confirm your password';
    if (passwordData.new_password !== passwordData.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setLoading(true);
    
    try {
      const token = getAuthToken();
      const response = await axios.post(
        'https://nortway.mrshakil.com/api/auth/change-password/',
        {
          old_password: passwordData.old_password,
          new_password: passwordData.new_password,
          confirm_password: passwordData.confirm_password
        },
        { headers: { 'Authorization': `Token ${token}` } }
      );
      
      console.log('Response:', response.data);
      
      // Check if response is successful (either by success flag or by having a message)
      if (response.data.message === "Password changed successfully." || response.data.success === true) {
        // Close modal first
        onClose();
        setPasswordData({
          old_password: '',
          new_password: '',
          confirm_password: ''
        });
        setPasswordErrors({});
        
        // Show success alert after modal is closed
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message || 'Your password has been changed successfully.',
          confirmButtonColor: '#ff9100',
          confirmButtonText: 'OK',
          didOpen: () => {
            const swalContainer = Swal.getContainer();
            if (swalContainer) {
              swalContainer.style.zIndex = '100000';
            }
          }
        });
      } else if (response.data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.error || 'Failed to change password.',
          confirmButtonColor: '#ff9100',
          didOpen: () => {
            const swalContainer = Swal.getContainer();
            if (swalContainer) {
              swalContainer.style.zIndex = '100000';
            }
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.message || 'Failed to change password. Please try again.',
          confirmButtonColor: '#ff9100',
          didOpen: () => {
            const swalContainer = Swal.getContainer();
            if (swalContainer) {
              swalContainer.style.zIndex = '100000';
            }
          }
        });
      }
    } catch (err) {
      console.error('Error changing password:', err);
      // Check if error response has a message
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Failed to change password. Please check your current password.';
      
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
        confirmButtonColor: '#ff9100',
        didOpen: () => {
          const swalContainer = Swal.getContainer();
          if (swalContainer) {
            swalContainer.style.zIndex = '100000';
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 backdrop-blur-md bg-white/30" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full z-[10000]">
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleChangePassword} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  name="old_password"
                  value={passwordData.old_password}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 pr-10 border ${passwordErrors.old_password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordErrors.old_password && <p className="mt-1 text-xs text-red-500">{passwordErrors.old_password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="new_password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 pr-10 border ${passwordErrors.new_password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                  placeholder="Enter new password (min 3 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordErrors.new_password && <p className="mt-1 text-xs text-red-500">{passwordErrors.new_password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm_password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 pr-10 border ${passwordErrors.confirm_password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent`}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordErrors.confirm_password && <p className="mt-1 text-xs text-red-500">{passwordErrors.confirm_password}</p>}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-600">
                Password must be at least 3 characters long.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition disabled:opacity-50"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Topbar Component
export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard Overview';
    if (pathname === '/dashboard/blogs') return 'Blog Management';
    if (pathname === '/dashboard/images') return 'Photo Gallery';
    if (pathname === '/dashboard/videos') return 'Video Gallery';
    if (pathname === '/dashboard/testimonials') return 'Testimonials Management';
    return 'Dashboard';
  };

  const handleLogout = async () => {
    setShowProfileMenu(false);
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to logout from your account.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ff9100',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        const swalContainer = Swal.getContainer();
        if (swalContainer) {
          swalContainer.style.zIndex = '100000';
        }
      }
    });
    
    if (result.isConfirmed) {
      await logout();
      router.push('/');
      Swal.fire({
        icon: 'success',
        title: 'Logged Out!',
        text: 'You have been successfully logged out.',
        confirmButtonColor: '#ff9100',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          const swalContainer = Swal.getContainer();
          if (swalContainer) {
            swalContainer.style.zIndex = '100000';
          }
        }
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10">
        {/* Left side - Page Title */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
          <p className="text-xs text-gray-500 mt-0.5">Welcome back, {user?.username || 'Admin'}!</p>
        </div>

        {/* Right side - Search & User */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9100] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>

          {/* Notification Bell */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <FaBell className="text-lg" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff9100] rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 bg-[#ff9100] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.username?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.username || 'Admin'}</span>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowChangePassword(true);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition flex items-center gap-2"
                    >
                      <span>🔒</span> Change Password
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition flex items-center gap-2"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={showChangePassword} 
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}