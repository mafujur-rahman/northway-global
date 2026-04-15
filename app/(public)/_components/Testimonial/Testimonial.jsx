


'use client'
import React from 'react'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { GiNothingToSay } from 'react-icons/gi'
import Marquee from 'react-fast-marquee'

// Reusable Card Component to match the image design
const TestimonialCard = ({ item }) => (
  <div className='bg-white rounded-xl p-8 w-72 lg:w-80 xl:w-[400px] flex-shrink-0 mx-3 flex flex-col gap-6 shadow-sm'>
    {/* Header: Image and Author Info */}
    <div className='flex items-center gap-4'>
      <img
        src={item.authorImage}
        alt={item.authorName}
        className='w-16 h-16 rounded-full object-cover border-2 border-white'
      />
      <div className='flex flex-col'>
        <h4 className='text-[#2D4356] font-bold text-xl leading-tight'>
          {item.authorName}
        </h4>
        <p className='text-[#6B7C8E] text-sm font-medium'>
          {item.authorTitle}
        </p>
      </div>
    </div>

    {/* Message Body */}
    <p className='text-[#2D4356] text-lg leading-relaxed font-normal'>
      {item.message}
    </p>
  </div>
)

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      message:
        'Northway Global made my study abroad dream reality with excellent guidance and support provided.',
      authorName: 'Alice Johnson',
      authorTitle: 'Software Engineer',
      authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      stars: Math.floor(Math.random() * 2) + 4
    },
    {
      id: 2,
      message:
        'Amazing team, very professional service helped me with visa and university application smoothly.',
      authorName: 'Mark Thompson',
      authorTitle: 'Student',
      authorImage: 'https://randomuser.me/api/portraits/men/45.jpg',
      stars: Math.floor(Math.random() * 2) + 4
    },
    {
      id: 3,
      message:
        'Highly recommend Northway Global, they assisted me through every important step very smoothly.',
      authorName: 'Sara Williams',
      authorTitle: 'Research Analyst',
      authorImage: 'https://randomuser.me/api/portraits/women/25.jpg',
      stars: Math.floor(Math.random() * 2) + 4
    },
    {
      id: 4,
      message:
        'Professional, friendly and efficient service, made my immigration process easy and stress free.',
      authorName: 'John Smith',
      authorTitle: 'Business Analyst',
      authorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      stars: Math.floor(Math.random() * 2) + 4
    }
  ]

  return (
    <div className='section__spacing'>
      <div className='relative'>
        <SectionHeading
          text='Testimonials'
          Icon={GiNothingToSay}
          title='What’s Our '
          colorTitle='student say'
          subtitle='Our students have shared their incredible journeys and successes, from gaining admissions to top universities to receiving life-changing scholarships.'
        />
      </div>

      <div className='common__top__spacing tes__container relative'>
        {/* Desktop View */}
        <div className='hidden lg:block'>
          <Marquee
            gradient={true}
            speed={40}
            pauseOnHover
            autoFill={true}
            gradientColor='#F3F4F6'
          >
            {testimonials.map(item => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </Marquee>
        </div>

        {/* Mobile and Tablet View */}
        <div className='lg:hidden block'>
          <Marquee speed={40} pauseOnHover autoFill={true}>
            {testimonials.map(item => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}