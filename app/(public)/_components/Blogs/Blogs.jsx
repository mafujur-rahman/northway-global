'use client'
import React from 'react'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { FaBlog } from 'react-icons/fa'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import { blogs } from '../fakeDb/blogData'
import Link from 'next/link'
import BaseBtn from '../utlities/CommonBtn/BaseBtn'
import { MdOutlineArrowOutward } from 'react-icons/md'

export default function BlogList () {
  return (
    <div className='section__spacing '>
      <SectionHeading
        text='Blogs'
        Icon={FaBlog}
        title='Our Latest '
        colorTitle='Blog'
        subtitle='Stay updated with the latest insights and trends in international education through our blog. From study abroad tips to scholarship opportunities and student success stories, our blog is your go-to resource for everything related to global education.'
      />

      {/* Auto scrolling blogs */}
      <div className='common__top__spacing grid md:grid-cols-2 lg:grid-cols-3 gap-5 h-full '>
        {blogs.slice(0, 3).map(blog => (
          <div
            key={blog.id}
            className=' bg-white p-5 rounded-lg border border-black/10 group'
            data-tooltip={blog.title}
          >
            <div className='overflow-hidden '>
              <Image
                src={blog.blogImg}
                alt={blog.title}
                className='w-full h-72 object-cover rounded-md mb-4 '
                width={500}
                height={300}
              />
            </div>
            <Link href={`/blogs/${blog.id}`}>
              <h3 className='text__medium mb-2 line-clamp-1 group-hover:underline underline-offset-2 group-hover:!text-[#FF9100]'>
                {blog.title}
              </h3>
            </Link>
            <p className='text__base  line-clamp-2'>{blog.shortDes}</p>

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

      {/* Blog btn  */}
      <div className='mt-10 flex justify-center cursor-pointer'>
        <BaseBtn text='Show All' icon={MdOutlineArrowOutward} link='/blogs' />
      </div>
    </div>
  )
}
