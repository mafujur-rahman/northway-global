'use client'
import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { GoPlay } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'

function StudentSpeaks () {
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

  // Slider data with name, designation, image, and video
  const students = [
    {
      name: 'Alice Johnson',
      designation: 'Software Engineer',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      name: 'Bob Smith',
      designation: 'Data Analyst',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
      videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U'
    },
    {
      name: 'Carol Lee',
      designation: 'UI/UX Designer',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
      videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
    },
    {
      name: 'David Kim',
      designation: 'Marketing Specialist',
      image:
        'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/cost.webp',
      videoUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0'
    }
  ]

  const openModal = url => {
    setVideoUrl(url)
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
            Student <span className='heading__color__text'> Speaks</span>
          </h2>
          <p className='heading__sub__text text-center max-w-3xl mx-auto px-4 !text-white'>
            Northway Global truly made my dream of studying abroad a reality.
            Their team guided me through every step, from choosing the right
            university to ensuring a smooth visa process. I couldn't have done
            it without their constant support.
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 max-w-6xl w-full px-10'>
        <Slider {...settings}>
          {students.map((student, i) => (
            <div key={i} className='2xl:px-3 px-0'>
              <div
                className='slide-item mx-auto transition-transform duration-300 ease-in-out cursor-pointer bg-white p-5 rounded-lg'
                onClick={() => openModal(student.videoUrl)}
              >
                {/* Make this wrapper relative */}
                <div className='relative'>
                  <img
                    src={student.image}
                    alt={student.name}
                    className='w-full h-60 md:h-72 object-cover rounded-md transition-all duration-300'
                  />

                  {/* Play button center of image */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <GoPlay className='text-5xl text-white drop-shadow-lg' />
                  </div>
                </div>

                <div className='text-center text-black/80 py-4'>
                  <p className='font-semibold text-xl'>{student.name}</p>
                  <p className='text-sm font-semibold'>{student.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'>
          <div className='relative w-full max-w-4xl px-4'>
            <button
              className='absolute -top-4 cursor-pointer right-0 text-white text-3xl z-50'
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
          border-radius: '8px';
        }
        .slide-item {
          transform: scale(0.8);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  )
}

export default StudentSpeaks
