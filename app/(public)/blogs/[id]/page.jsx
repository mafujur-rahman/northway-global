import Image from 'next/image'

import { blogs } from '../../_components/fakeDb/blogData'

export default function BlogDetails ({ params }) {
  const blogId = parseInt(params.id)
  const blog = blogs.find(b => b.id === blogId)


  if (!blog) {
    return <div className='p-10 text-center'>Blog not found</div>
  }

  return (
    <div className='max-w-5xl mx-auto px-4 md:px-10 lg:px-10 xl:px-20 py-10'>
      {/* Title */}
      <h1 className='bl__title'>{blog.title}</h1>

      {/* Meta */}
      <div className='flex items-center mb-6 mt-5 xl:mt-10'>
        <img
          src={blog.authorImage}
          alt={blog.authorName}
          className='w-12 h-12 rounded-full mr-3'
        />
        <div>
          <p className='heading__sub__text'>{blog.authorName}</p>
          <p className='text__base'>{blog.publishedDate}</p>
        </div>
      </div>

      {/* Image */}
      <Image
        src={blog.blogImg}
        alt={blog.title}
        width={800}
        height={500}
        className='rounded-lg mb-6 w-full h-[50vh] object-cover'
      />

      {/* Content */}
      <p className='text-lg leading-relaxed mb-6'>{blog.briefDesOne}</p>
      <p className='text-lg leading-relaxed'>{blog.briefDesTwo}</p>
    </div>
  )
}
