'use client'
import { useState } from 'react'

const gallery = [
  {
    id: 1,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/pexels-hai-nguyen-825252-1699414.jpg'
  },
  {
    id: 2,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-66dc17dbb29cb.webp'
  },
  {
    id: 3,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-2-66dc18f85d91b.webp'
  },
  {
    id: 4,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/pexels-hai-nguyen-825252-1699414.jpg'
  },
  {
    id: 5,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-66dc17dbb29cb.webp'
  },
  {
    id: 6,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-2-66dc18f85d91b.webp'
  },
  {
    id: 7,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/pexels-hai-nguyen-825252-1699414.jpg'
  },
  {
    id: 8,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-66dc17dbb29cb.webp'
  },
  {
    id: 9,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-2-66dc18f85d91b.webp'
  },
  {
    id: 10,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/pexels-hai-nguyen-825252-1699414.jpg'
  },
  {
    id: 11,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-66dc17dbb29cb.webp'
  },
  {
    id: 12,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-2-66dc18f85d91b.webp'
  },
  {
    id: 13,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/pexels-hai-nguyen-825252-1699414.jpg'
  },
  {
    id: 14,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-66dc17dbb29cb.webp'
  },
  {
    id: 15,
    image:
      'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/photo/rectangle-5-2-66dc18f85d91b.webp'
  }
]

export default function PhotoGalleryCmp () {
  const [showAll, setShowAll] = useState(false)
  const visibleGallery = showAll ? gallery : gallery.slice(0, 9)

  return (
    <div className=' section__spacing'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {visibleGallery.map(item => (
          <div key={item.id} className='overflow-hidden rounded-lg'>
            <img
              src={item.image}
              alt={`Gallery ${item.id}`}
              className='w-full h-[40vh] object-cover hover:scale-105 transition-transform duration-300'
            />
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
