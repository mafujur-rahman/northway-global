'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import BaseBtn from '../utlities/CommonBtn/BaseBtn'
import { MdArrowOutward } from 'react-icons/md'
// Added FiGlobe for the plane/globe icon look
import { FiGlobe } from 'react-icons/fi'
import {
  FaUserTie,
  FaChartLine,
  FaClock,
  FaProjectDiagram
} from 'react-icons/fa'

const bannerData = [
  {
    id: 1,
    title: 'Welcome to ',
    color: 'Northway Global',
    desc: 'We help Bangladeshi- Global students get admission to top universities in the USA, Canada, Australia, Europe, China, Malaysia, and more.',
    btn: 'Apply now'
  }
]

const featureData = [
  {
    id: 1,
    title: 'Experienced Consultants',
    icon: <FaUserTie className='text-4xl text-[#FF9100]' />
  },
  {
    id: 2,
    title: '98.8% Success Rate',
    icon: <FaChartLine className='text-4xl text-[#FF9100]' />
  },
  {
    id: 3,
    title: 'Positive And Timely Results',
    icon: <FaClock className='text-4xl text-[#FF9100]' />
  },
  {
    id: 4,
    title: 'Seamless Procedures',
    icon: <FaProjectDiagram className='text-4xl text-[#FF9100]' />
  }
]

export default function HeroBanner() {
  const featureSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className='w-full relative h-[90vh]'>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className='absolute inset-0 w-full h-full object-cover z-0'
      >
        <source src='/northway-banner.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Black Overlay */}
      <div className='absolute inset-0 bg-black/50 z-10' />

      {/* Content */}
      <div className='absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-10 xl:px-20'>
        <div className='max-w-2xl text-left text-white space-y-6'>

          {/* New Simplified Badge Design */}
          <div className="flex items-center gap-3 w-fit">
            <div className="bg-[#ff9100] text-white px-6 py-2 rounded-full text-sm md:text-lg font-medium shadow-lg">
              Study Abroad Made Simplified at Northway Global
            </div>
            <div className="">
              <img
                src="/plane-icon.png"
                alt="Plane Icon"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </div>

          <h1 className='text-4xl md:text-5xl xl:text-7xl font-bold leading-tight'>
            {bannerData[0].title}{' '}
            <span className='heading__color__text'>{bannerData[0].color}</span>
          </h1>
          <p className='text-base md:text-xl'>{bannerData[0].desc}</p>

          <BaseBtn
            text={bannerData[0].btn}
            link='/contact-us'
            icon={MdArrowOutward}
            className='bg-[#ff9100] text-white'
          />
        </div>

        {/* Feature Section */}
        <div className='mt-12 md:mt-16 max-w-7xl'>
          {/* Mobile & Tablet: Slider */}
          <div className='block lg:hidden'>
            <Slider {...featureSliderSettings}>
              {featureData.map(feature => (
                <div key={feature.id} className='md:px-1'>
                  <div className='flex flex-col items-center text-center bg-white/10 backdrop-blur-md shadow-md rounded-xl p-6 hover:shadow-lg transition'>
                    {feature.icon}
                    <h3 className='mt-4 text-lg font-semibold text-white'>
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Desktop: Grid */}
          <div className='hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-6'>
            {featureData.map(feature => (
              <div
                key={feature.id}
                className='flex flex-col items-center text-center bg-white/10 backdrop-blur-md shadow-md rounded-xl p-6 hover:shadow-lg transition'
              >
                {feature.icon}
                <h3 className='mt-4 text-lg font-semibold text-white'>
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}