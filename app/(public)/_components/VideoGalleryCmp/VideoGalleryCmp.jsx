// import React from 'react'

// export default function VideoGalleryCmp() {
//   return (
//     <div>VideoGalleryCmp</div>
//   )
// }

'use client'
import { useState } from 'react'

const gallery = [
  {
    id: 1,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 2,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 3,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 4,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 5,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 6,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 7,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 8,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 9,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 10,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 11,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 12,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 13,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 14,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  },
  {
    id: 15,
    videoLink:
      'https://player.vimeo.com/video/1054041163?h=5cf8e371e8&title=0&byline=0&portrait=0&badge=0&autoplay=0&controls=1&dnt=1&loop=0'
  }
]

export default function VideoGalleryCmp () {
  const [showAll, setShowAll] = useState(false)
  const visibleGallery = showAll ? gallery : gallery.slice(0, 6)

  return (
    <div className=''>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {visibleGallery.map(item => (
          <div key={item.id} className='overflow-hidden rounded-lg'>
            <div className='h-full '>
              <iframe
                className='w-full h-[30vh] xl:h-[35vh] rounded-lg '
                src={item.videoLink}
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                allowFullScreen
                aria-controls='false'
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-16'>
        <button
          onClick={() => setShowAll(!showAll)}
          className='px-6 py-2  rounded-md bg-[#ff9100] text-white cursor-pointer '
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  )
}
