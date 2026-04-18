// app/blogs/[id]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaArrowLeft, FaCalendar, FaUser, FaFilePdf } from 'react-icons/fa';

export default function BlogDetailsPage({ params }) {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ CORRECT: Unwrap the params Promise using React.use()
  const { id } = React.use(params);

  const getAuthToken = () => localStorage.getItem('auth_token');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const token = getAuthToken();
        console.log('Fetching blog with ID:', id);
        
        const response = await axios.get(
          `https://nortway.mrshakil.com/api/blogs/${id}/`,
          { 
            headers: { 
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            } 
          }
        );
        
        console.log('API Response:', response.data);
        
        // Check different response structures
        if (response.data.success && response.data.data) {
          setBlog(response.data.data);
        } else if (response.data.data && !response.data.success) {
          setBlog(response.data.data);
        } else if (response.data.id) {
          setBlog(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        console.error('Error response:', err.response?.data);
        
        if (err.response?.status === 404) {
          setError('Blog not found');
        } else if (err.response?.status === 401) {
          setError('Authentication failed. Please login again.');
        } else {
          setError('Failed to load blog. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogDetails();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Function to render HTML content safely
  const renderHTMLContent = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (loading) {
    return (
      <div className='section__spacing'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='animate-pulse'>
              <div className='h-8 bg-gray-200 rounded w-3/4 mb-4'></div>
              <div className='h-4 bg-gray-200 rounded w-1/2 mb-8'></div>
              <div className='h-96 bg-gray-200 rounded mb-6'></div>
              <div className='space-y-3'>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='section__spacing'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='rounded-lg shadow-sm p-8'>
              <div className='text-red-600 text-5xl mb-4'>⚠️</div>
              <h2 className='text-2xl font-bold text-gray-800 mb-2'>Blog Not Found</h2>
              <p className='text-gray-600 mb-6'>{error}</p>
              <button 
                onClick={() => router.push('/blogs')}
                className='px-6 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition'
              >
                Back to Blogs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='bg-white rounded-lg shadow-sm p-8'>
              <div className='text-gray-400 text-5xl mb-4'>📝</div>
              <h2 className='text-2xl font-bold text-gray-800 mb-2'>No Blog Found</h2>
              <p className='text-gray-600 mb-6'>The blog post you're looking for doesn't exist.</p>
              <button 
                onClick={() => router.push('/blogs')}
                className='px-6 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition'
              >
                Browse All Blogs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='section__spacing'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className='flex items-center gap-2 text-gray-600 hover:text-[#ff9100] transition mb-6'
          >
            <FaArrowLeft /> Back to Blogs
          </button>

          {/* Blog Header */}
          <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            {blog.thumbnail && (
              <div className='w-full h-96 relative'>
                <img 
                  src={blog.thumbnail} 
                  alt={blog.title}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className='p-8'>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                {blog.title}
              </h1>
              
              <div className='flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200'>
                <div className='flex items-center gap-2 text-gray-600'>
                  <FaUser className='text-[#ff9100]' />
                  <span>{blog.writer || 'Admin'}</span>
                </div>
                <div className='flex items-center gap-2 text-gray-600'>
                  <FaCalendar className='text-[#ff9100]' />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                {blog.posted_year && (
                  <div className='flex items-center gap-2 text-gray-600'>
                    <span>📅</span>
                    <span>Year: {blog.posted_year}</span>
                  </div>
                )}
                {blog.pdf_file && (
                  <a 
                    href={blog.pdf_file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='flex items-center gap-2 text-[#ff9100] hover:underline ml-auto'
                  >
                    <FaFilePdf /> Download PDF
                  </a>
                )}
              </div>

              {/* Short Summary */}
              {blog.short_summary && (
                <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                  <p className='text-gray-700 italic'>{blog.short_summary}</p>
                </div>
              )}

              {/* Main Content - HTML Render */}
              <div className='blog-content prose prose-lg max-w-none'>
                <div dangerouslySetInnerHTML={renderHTMLContent(blog.content)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for HTML content */}
      <style jsx global>{`
        .blog-content {
          line-height: 1.8;
        }
        
        .blog-content h1 {
          font-size: 2em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
          color: #1a202c;
        }
        
        .blog-content h2 {
          font-size: 1.5em;
          margin-top: 1.2em;
          margin-bottom: 0.5em;
          font-weight: bold;
          color: #2d3748;
        }
        
        .blog-content h3 {
          font-size: 1.25em;
          margin-top: 1em;
          margin-bottom: 0.5em;
          font-weight: bold;
          color: #2d3748;
        }
        
        .blog-content p {
          margin-bottom: 1.2em;
          color: #4a5568;
        }
        
        .blog-content ul, 
        .blog-content ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        .blog-content li {
          margin-bottom: 0.5em;
        }
        
        .blog-content a {
          color: #ff9100;
          text-decoration: underline;
          transition: color 0.2s;
        }
        
        .blog-content a:hover {
          color: #e68200;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          margin: 1.5em 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        
        .blog-content th,
        .blog-content td {
          border: 1px solid #e2e8f0;
          padding: 0.75em;
          text-align: left;
        }
        
        .blog-content th {
          background-color: #f7fafc;
          font-weight: bold;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #ff9100;
          margin: 1.5em 0;
          padding: 0.5em 0 0.5em 1.5em;
          background-color: #f7fafc;
          font-style: italic;
          color: #4a5568;
        }
        
        .blog-content code {
          background-color: #edf2f7;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        
        .blog-content pre {
          background-color: #2d3748;
          color: #f7fafc;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        
        .blog-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        
        .blog-content iframe {
          max-width: 100%;
          margin: 1.5em 0;
          border-radius: 8px;
        }
        
        .blog-content hr {
          margin: 2em 0;
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, #e2e8f0, transparent);
        }
        
        .blog-content strong {
          font-weight: bold;
          color: #2d3748;
        }
        
        .blog-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}