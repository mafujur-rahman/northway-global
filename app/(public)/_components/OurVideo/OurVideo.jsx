'use client'
import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { GoPlay } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'

function OurVideo () {
  const [isOpen, setIsOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')

  const settings = {
    dots: false,
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    speed: 500,
    draggable: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  }

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   centerPadding: '0px',
  //   arrows: false,
  //   slidesToShow: 3, 
  //   slidesToScroll: 1,
  //   centerMode: true, 
  //   responsive: [
  //     {
  //       breakpoint: 1024, 
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: false 
  //       }
  //     },
  //     {
  //       breakpoint: 640, 
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: false 
  //       }
  //     }
  //   ]
  // }

  const images = [
    'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
    'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
    'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
    'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp'
  ]

  // Dummy YouTube URLs
  const videos = [
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube.com/embed/ysz5S6PUM-U',
    'https://www.youtube.com/embed/jNQXAC9IVRw',
    'https://www.youtube.com/embed/oHg5SJYRHA0'
  ]

  const openModal = index => {
    setVideoUrl(videos[index])
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setVideoUrl('')
  }

  return (
    <div className='mt-[10vh] mb-[30vh] lg:mt-[15vh] relative'>
      {/* Header Section */}
      <div className='relative py-20 bg-[url("https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/others/ourVideo.webp")] bg-no-repeat w-full bg-cover bg-center h-[60vh] 2xl:h-[50vh]'>
        <div className='absolute inset-0 bg-black/60'></div>
        <div className='relative z-10'>
          <h2 className='headingText text-center !text-white'>
            Our <span className='heading__color__text'>Video</span>
          </h2>
          <p className='heading__sub__text text-center max-w-3xl mx-auto px-4 !text-white'>
            Explore insights and success stories from our students who have
            embarked on their study abroad journeys. Watch how we've helped
            countless individuals achieve their academic dreams across the
            globe.
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 max-w-6xl w-full px-10'>
        <Slider {...settings}>
          {images.map((src, i) => (
            <div key={i} className='2xl:px-3 px-0'>
              <div
                className='slide-item relative mx-auto transition-transform duration-300 ease-in-out cursor-pointer'
                onClick={() => openModal(i)}
              >
                <img
                  src={src}
                  alt={`Slide ${i}`}
                  className='w-full h-60 md:h-72 object-cover rounded-lg transition-all duration-300'
                />
                <div className='absolute inset-0 rounded-md flex items-center justify-center bg-black/20'>
                  <GoPlay className='text-5xl text-white' />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'>
          <div className='relative w-full max-w-3xl px-4'>
            <button
              className='absolute top-2 right-2 text-white text-3xl z-50'
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
            <div className='relative pt-[56.25%]'>
              <iframe
                src={videoUrl}
                title='YouTube Video'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='absolute top-0 left-0 w-full h-full'
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .slick-center .slide-item {
          transform: scale(1);
          z-index: 2;
        }
        .slick-center .slide-item img {
          border-radius: 1rem;
        }
        .slide-item {
          transform: scale(0.8);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  )
}

export default OurVideo
