'use client'
import React, { useState } from 'react'
import { FaBlog } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { blogs } from '../fakeDb/blogData'
import { MdOutlineArrowOutward } from 'react-icons/md'

export default function BlogCmp () {
  const [showAll, setShowAll] = useState(false)

  // if showAll = true → show all blogs, otherwise show only 6
  const visibleBlogs = showAll ? blogs : blogs.slice(0, 6)

  return (
    <div className='section__spacing '>
      {/* Blog Grid */}
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
        {visibleBlogs.map(blog => (
          <div
            key={blog.id}
            className=' bg-white p-5 rounded-lg border border-black/10 group'
            data-tooltip={blog.title}
          >
            <div className='overflow-hidden'>
              <Image
                src={blog.blogImg}
                alt={blog.title}
                className='w-full h-72 object-cover rounded-md mb-4'
                width={500}
                height={300}
              />
            </div>
            <Link href={`/blogs/${blog.id}`}>
              <h3 className='text__medium mb-2 line-clamp-1 group-hover:underline underline-offset-2 group-hover:!text-[#FF9100]'>
                {blog.title}
              </h3>
            </Link>
            <p className='text__base line-clamp-2'>{blog.shortDes}</p>

            <div className='flex items-center mt-5'>
              <img
                src={blog.authorImage}
                alt={blog.authorName}
                className='w-10 h-10 rounded-full mr-3'
              />
              <div>
                <h4 className='text__medium'>{blog.authorName}</h4>
                <p className='text__base'>{blog.publishedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    
      <div className='mt-10 flex justify-center'>
        <button
          onClick={() => setShowAll(!showAll)}
          className='px-6 py-2 bg-[#FF9100] text-white rounded-lg cursor-pointer '
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  )
}
