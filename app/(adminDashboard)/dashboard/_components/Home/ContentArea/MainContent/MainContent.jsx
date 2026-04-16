// components/dashboard/MainContent.jsx
'use client';
import React from 'react';

export default function MainContent({ activeTab }) {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'blogs':
        return <BlogsContent />;
      case 'images':
        return <ImagesContent />;
      case 'videos':
        return <VideosContent />;
      case 'testimonials':
        return <TestimonialsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <main className="pt-20 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </main>
  );
}

// Dashboard Content
function DashboardContent() {
  const stats = [
    { label: 'Total Blogs', value: '24', icon: '📝', color: 'bg-[#ff9100]' },
    { label: 'Photos', value: '156', icon: '🖼️', color: 'bg-blue-500' },
    { label: 'Videos', value: '42', icon: '🎥', color: 'bg-green-500' },
    { label: 'Testimonials', value: '18', icon: '⭐', color: 'bg-purple-500' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
              <div className="w-2 h-2 bg-[#ff9100] rounded-full"></div>
              <p className="text-sm text-gray-600">New blog post published: "Study Abroad Tips"</p>
              <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Blogs Content
function BlogsContent() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
        <button className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition text-sm font-medium">
          + Add New Blog
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-left">
              <th className="pb-3 text-sm font-medium text-gray-500">Title</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Writer</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Posted Year</th>
              <th className="pb-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-3 text-sm text-gray-900">Sample Blog Post {i}</td>
                <td className="py-3 text-sm text-gray-600">Admin User</td>
                <td className="py-3 text-sm text-gray-600">2024</td>
                <td className="py-3">
                  <button className="text-[#ff9100] hover:text-[#e68200] text-sm mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Images Content
function ImagesContent() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Photo Gallery</h3>
        <button className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition text-sm font-medium">
          + Add Photo
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image {i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Videos Content
function VideosContent() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Video Gallery</h3>
        <button className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition text-sm font-medium">
          + Add Video
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 p-3 border border-gray-200 rounded-lg">
            <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400 text-xs">Thumbnail</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Sample Video {i}</h4>
              <p className="text-xs text-gray-500 mt-1">https://youtube.com/...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Testimonials Content
function TestimonialsContent() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Testimonials</h3>
        <button className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition text-sm font-medium">
          + Add Testimonial
        </button>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <h4 className="font-medium text-gray-900">John Doe</h4>
                <p className="text-xs text-gray-500">Harvard University</p>
              </div>
              <div className="ml-auto flex text-[#ff9100] text-sm">★★★★★</div>
            </div>
            <p className="text-sm text-gray-600">Great experience working with Nortway! Highly recommended.</p>
          </div>
        ))}
      </div>
    </div>
  );
}