'use client'
import React, { useState } from 'react'
import { FaBlog, FaRegImage, FaVideo, FaQuoteRight } from 'react-icons/fa'

export default function MainContent () {
  const [activeTab, setActiveTab] = useState('blogs')

  const tabs = [
    {
      id: 'blogs',
      label: 'Blogs',
      icon: <FaBlog  />,
      content:
        'Here you can manage all your blog posts, add new articles, and update existing ones.'
    },
    {
      id: 'images',
      label: 'Images',
      icon: <FaRegImage  />,
      content:
        'Manage your uploaded images. Add new pictures, organize albums, and update visuals.'
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: <FaVideo  />,
      content:
        'Keep track of your videos. Upload, edit, and organize your video content here.'
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: <FaQuoteRight  />,
      content:
        'View and manage client testimonials. Add new feedback and showcase reviews.'
    }
  ]

  return (
    <section className='mt-[5vh]'>
      <div>
        <button className='rounded-full py-1 px-4 text-center text-sm border border-black/10 mb-1'>
          Content
        </button>
        <h2 className='text-xl font-semibold text-black/80 mb-2.5'>
          Manage your content
        </h2>
        <p className='text-sm text-gray-600 max-w-xl'>
          Easily track, organize, and update your blogs, photos, videos, and
          testimonials all in one place. Keep your content fresh and engaging
          with just a few clicks.
        </p>
      </div>

      {/* content area  */}
      <section className='my-[3vh] h-[50vh] w-full p-5  border border-black/10 rounded-lg flex'>
        {/* Tabs (left side) */}
        <div className='w-1/4 border-r border-gray-200 pr-4'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 w-full px-3 py-2 mb-2 rounded-md text-base cursor-pointer font-medium text-left transition ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-black/80'
                  : 'bg-gray-50 text-black/80 hover:bg-gray-100'
              }`}
            >
             <span className='text-sm'> {tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content (right side) */}
        <div className='w-3/4 pl-6'>
          {tabs.map(
            tab =>
              activeTab === tab.id && (
                <div key={tab.id}>
                  <h3 className='text-lg font-semibold mb-2 flex items-center gap-2'>
                     {tab.label}
                  </h3>
                  <p className='text-gray-600'>{tab.content}</p>
                </div>
              )
          )}
        </div>
      </section>
    </section>
  )
}
