import React from 'react'
import TooltipBtn from '../utlities/TooltipBtn/TooltipBtn'
import { FaUserAlt } from 'react-icons/fa'
import { GoArrowUpRight } from 'react-icons/go'

import BaseBtn from '../utlities/CommonBtn/BaseBtn'

export default function AboutUs ({ heading, btnLink, colorText }) {
  const aboutUsData = {
    description:
      'Northway Global is a trusted education consulting firm. We are a professional education consultancy dedicated to helping Bangladeshi students pursue higher education abroad. Established in 2019, our mission is to make international education accessible, simple, and successful. We provide personalized guidance and support in educational planning, admissions consulting, career development, documentation, visa guidance, and more.',

    highlights: [
      { title: 'Expert Guidance.' },
      { title: 'Seamless Transitions.' },
      { title: 'Study Abroad Success.' },
      { title: 'Academic Excellence.' }
    ],

    stats: [
      { number: '1000+', label: 'Global University Tips' },
      { number: '3+', label: 'Office Across The Globe' },
      { number: '8+', label: 'Years Industry Presence' }
    ]
  }

  return (
    <div className='section__spacing '>
      <div className='ab__container '>
        <div >
          <div className='overflow-hidden rounded-xl mb-5 '>
            <iframe
              className='w-full h-[30vh] lg:h-[45vh] xl:h-[55vh]'
              src='https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowFullScreen
              title='About Northway Global'
            ></iframe>
          </div>
          <div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2  '>
              {aboutUsData.stats.map((stat, i) => (
                <div
                  key={i}
                  className='flex flex-col items-center border border-black/10 p-2 text-center'
                >
                  <h3 className='text-xl font-bold text-black/80 '>
                    {stat.number}
                  </h3>
                  <p className='text-gray-500'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-10 md:mt-0'>
          {/* Main content */}
          <TooltipBtn text='About Us' icon={FaUserAlt} />
          <div className='space-y-5'>
            {/* Heading */}
            <h2 className='headingText'>
              {heading}{' '}
              <span className='heading__color__text'>{colorText}</span>
            </h2>
            <p className='heading__sub__text'>{aboutUsData.description}</p>

            {/* Highlights */}
            <div>
              <ul className=''>
                {aboutUsData.highlights.map((item, i) => (
                  <li key={i} className='ab__list'>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* button  */}
            <BaseBtn text='Know More' icon={GoArrowUpRight} link='/about-us' />
          </div>
        </div>
      </div>
    </div>
  )
}
