// app/components/BlogList.jsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SectionHeading from '../utlities/SectionHeading/SectionHeading';
import { FaBlog } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import Link from 'next/link';
import BaseBtn from '../utlities/CommonBtn/BaseBtn';
import { MdOutlineArrowOutward } from 'react-icons/md';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const getAuthToken = () => localStorage.getItem('auth_token');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        const response = await axios.get(
          'https://nortway.mrshakil.com/api/blogs/',
          { headers: { 'Authorization': `Token ${token}` } }
        );

        if (response.data.success) {
          setBlogs(response.data.data);
          setTotalCount(response.data.count);
        } else {
          setBlogs(response.data.data || []);
          setTotalCount(response.data.count || 0);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className='section__spacing'>
        <SectionHeading
          text='Blogs'
          Icon={FaBlog}
          title='Our Latest '
          colorTitle='Blog'
          subtitle='Stay updated with the latest insights and trends in international education through our blog. From study abroad tips to scholarship opportunities and student success stories, our blog is your go-to resource for everything related to global education.'
        />

        <div className='common__top__spacing grid md:grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='bg-white p-5 rounded-lg border border-black/10 animate-pulse'>
              <div className='w-full h-72 bg-gray-200 rounded-md mb-4'></div>
              <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
              <div className='h-4 bg-gray-200 rounded w-full mb-1'></div>
              <div className='h-4 bg-gray-200 rounded w-2/3 mb-4'></div>
              <div className='flex items-center mt-5'>
                <div className='w-10 h-10 bg-gray-200 rounded-full mr-3'></div>
                <div className='flex-1'>
                  <div className='h-4 bg-gray-200 rounded w-24 mb-1'></div>
                  <div className='h-3 bg-gray-200 rounded w-16'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='section__spacing'>
        <SectionHeading
          text='Blogs'
          Icon={FaBlog}
          title='Our Latest '
          colorTitle='Blog'
          subtitle='Stay updated with the latest insights and trends in international education through our blog.'
        />
        <div className='common__top__spacing text-center text-red-600 p-8'>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-[#ff9100] text-white rounded-lg'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='section__spacing'>
      <SectionHeading
        text='Blogs'
        Icon={FaBlog}
        title='Our Latest '
        colorTitle='Blog'
        subtitle='Stay updated with the latest insights and trends in international education through our blog. From study abroad tips to scholarship opportunities and student success stories, our blog is your go-to resource for everything related to global education.'
      />

      {/* Blog Grid */}
      <div className='common__top__spacing grid md:grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
        {blogs.length === 0 ? (
          <div className='col-span-3 text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📝</div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Blogs Yet</h3>
            <p className='text-gray-500'>Check back soon for new articles!</p>
          </div>
        ) : (
          blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              className='bg-white p-5 rounded-lg border border-black/10 group hover:shadow-md transition'
              data-tooltip={blog.title}
            >
              <div className='overflow-hidden rounded-md'>
                {blog.thumbnail ? (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className='w-full h-72 object-cover rounded-md mb-4 group-hover:scale-105 transition duration-300'
                  />
                ) : (
                  <div className='w-full h-72 bg-gray-100 rounded-md mb-4 flex items-center justify-center'>
                    <FaBlog className='text-4xl text-gray-300' />
                  </div>
                )}
              </div>
              <Link href={`/blogs/${blog.id}`}>
                <h3 className='text__medium mb-2 line-clamp-1 group-hover:underline underline-offset-2 group-hover:text-[#ff9100] transition'>
                  {blog.title}
                </h3>
              </Link>
              <p className='text__base line-clamp-2 text-gray-600'>
                {blog.short_summary || blog.content?.substring(0, 100)}
              </p>

              <div className='flex items-center mt-5'>
                {blog.writer ? (
                  <div className='w-10 h-10 rounded-full bg-[#ff9100] flex items-center justify-center text-white font-bold mr-3'>
                    {blog.writer.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3'>
                    <FaBlog className='text-gray-400' />
                  </div>
                )}
                <div>
                  <h4 className='text__medium text-gray-800'>{blog.writer || 'Admin'}</h4>
                  <p className='text__base text-gray-500'>
                    {formatDate(blog.created_at)} • {blog.posted_year}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Blog btn - Only show if there are blogs */}
      {blogs.length > 0 && (
        <div className='mt-10 flex justify-center cursor-pointer'>
          <BaseBtn text='Show All' icon={MdOutlineArrowOutward} link='/blogs' />
        </div>
      )}
    </div>
  );
}