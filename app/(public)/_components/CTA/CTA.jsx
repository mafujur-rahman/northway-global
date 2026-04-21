'use client'
import React from 'react'
import BaseBtn from '../utlities/CommonBtn/BaseBtn'
import { FaLongArrowAltRight } from 'react-icons/fa'

export default function CTA () {
  return (
    <div className='ct__container relative mt-[15vh]'>
      {/* Black overlay covering ENTIRE background image */}
      <div className='absolute inset-0 bg-black/50'></div>
      
      {/* Content on top of overlay */}
      <div className='relative z-10 flex items-center justify-center h-full'>
        <div className='max-w-4xl mx-auto px-4 md:px-10'>
          <h3 className='headingText !text-white'>
            Choose from <span className='heading__color__text'>100+ University</span> and College Scholarships
          </h3>
          <p className='heading__sub__text !text-white !font-semibold mb-10 mt-5 text-shadow-2xs'>
            Explore numerous opportunities to further your education and career
            with our partner universities and colleges. Our dedicated team will
            guide you through the process of applying for scholarships, ensuring
            that you find the best financial support for your academic journey.
          </p>
          <BaseBtn text='Join With Us' icon={FaLongArrowAltRight} className="!bg-[#ff9100] text-white" />
        </div>
      </div>
    </div>
  )
}