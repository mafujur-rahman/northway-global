// app/dashboard/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  FaBlog, 
  FaImages, 
  FaVideo, 
  FaQuoteRight, 
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import DashboardLayout from '../page';


export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    blogs: 0,
    photos: 0,
    videos: 0,
    testimonials: 0
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentTestimonials, setRecentTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('auth_token');

  // Fetch all data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getAuthToken();
        const headers = { headers: { 'Authorization': `Token ${token}` } };
        
        // Fetch all data in parallel
        const [blogsRes, photosRes, videosRes, testimonialsRes] = await Promise.all([
          axios.get('https://nortway.mrshakil.com/api/blogs/', headers),
          axios.get('https://nortway.mrshakil.com/api/gallery/photos/', headers),
          axios.get('https://nortway.mrshakil.com/api/gallery/videos/', headers),
          axios.get('https://nortway.mrshakil.com/api/testimonial/', headers)
        ]);
        
        // Set stats
        setStats({
          blogs: blogsRes.data.count || 0,
          photos: photosRes.data.count || 0,
          videos: videosRes.data.count || 0,
          testimonials: testimonialsRes.data.count || 0
        });
        
        // Set recent data (first 4 items for blogs, first 3 for testimonials)
        setRecentBlogs(blogsRes.data.data?.slice(0, 4) || []);
        setRecentTestimonials(testimonialsRes.data.data?.slice(0, 3) || []);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Navigation handlers
  const navigateTo = (path) => {
    router.push(path);
  };

  // Stats Cards
  const StatCard = ({ title, value, icon, color, trend, trendValue, path }) => (
    <div 
      onClick={() => path && navigateTo(path)}
      className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <FaArrowUp className="text-xs text-green-500" />
              ) : (
                <FaArrowDown className="text-xs text-red-500" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome to your CMS dashboard</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your content today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            title="Total Blogs" 
            value={stats.blogs} 
            icon={<FaBlog />} 
            color="bg-[#ff9100]"
            trend="up"
            trendValue="+12% from last month"
            path="/dashboard/blogs"
          />
          <StatCard 
            title="Photos" 
            value={stats.photos} 
            icon={<FaImages />} 
            color="bg-blue-500"
            trend="up"
            trendValue="+8% from last month"
            path="/dashboard/images"
          />
          <StatCard 
            title="Videos" 
            value={stats.videos} 
            icon={<FaVideo />} 
            color="bg-green-500"
            trend="up"
            trendValue="+5% from last month"
            path="/dashboard/videos"
          />
          <StatCard 
            title="Testimonials" 
            value={stats.testimonials} 
            icon={<FaQuoteRight />} 
            color="bg-purple-500"
            trend="down"
            trendValue="-2% from last month"
            path="/dashboard/testimonials"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Blogs */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h3>
                <button 
                  onClick={() => navigateTo('/dashboard/blogs')}
                  className="text-sm text-[#ff9100] hover:text-[#e68200] transition"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentBlogs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No blog posts yet. Create your first blog!
                </div>
              ) : (
                recentBlogs.map((blog) => (
                  <div key={blog.id} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      {blog.thumbnail ? (
                        <img 
                          src={blog.thumbnail} 
                          alt={blog.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <FaBlog className="text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{blog.title}</p>
                        <p className="text-xs text-gray-500 mt-1">By {blog.writer}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {blog.posted_year}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Testimonials */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Recent Testimonials</h3>
                <button 
                  onClick={() => navigateTo('/dashboard/testimonials')}
                  className="text-sm text-[#ff9100] hover:text-[#e68200] transition"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentTestimonials.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No testimonials yet. Add your first testimonial!
                </div>
              ) : (
                recentTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      {testimonial.profile_image ? (
                        <img 
                          src={testimonial.profile_image} 
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaQuoteRight className="text-gray-400 text-sm" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.university}</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          "{testimonial.comments.substring(0, 100)}..."
                        </p>
                      </div>
                      <div className="flex text-[#ff9100] text-xs">
                        {'★'.repeat(testimonial.star)}
                        {'☆'.repeat(5 - testimonial.star)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => navigateTo('/dashboard/blogs')}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
            >
              <FaBlog className="text-[#ff9100] mb-2 text-lg" />
              <p className="text-sm font-medium text-gray-900">Manage Blogs</p>
              <p className="text-xs text-gray-500">Create, edit, delete articles</p>
            </button>
            <button 
              onClick={() => navigateTo('/dashboard/images')}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
            >
              <FaImages className="text-blue-500 mb-2 text-lg" />
              <p className="text-sm font-medium text-gray-900">Manage Photos</p>
              <p className="text-xs text-gray-500">Upload, organize gallery</p>
            </button>
            <button 
              onClick={() => navigateTo('/dashboard/videos')}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
            >
              <FaVideo className="text-green-500 mb-2 text-lg" />
              <p className="text-sm font-medium text-gray-900">Manage Videos</p>
              <p className="text-xs text-gray-500">Add YouTube videos</p>
            </button>
            <button 
              onClick={() => navigateTo('/dashboard/testimonials')}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
            >
              <FaQuoteRight className="text-purple-500 mb-2 text-lg" />
              <p className="text-sm font-medium text-gray-900">Manage Testimonials</p>
              <p className="text-xs text-gray-500">Student feedback</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}