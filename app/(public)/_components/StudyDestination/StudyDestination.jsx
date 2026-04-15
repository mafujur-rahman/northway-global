'use client'
import { MdOutlineLocalOffer } from 'react-icons/md'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { HiAcademicCap } from 'react-icons/hi2'

export default function StudyDestination () {
  const studyDestinations = [
    {
      id: 1,
      country: 'Canada',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/Canada.jpg'
    },
    {
      id: 2,
      country: 'UK',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/London.jpg'
    },
    {
      id: 3,
      country: 'China',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/chinaGreatWall.jpg'
    },
    {
      id: 4,
      country: 'United States',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/img1.webp'
    },
    {
      id: 5,
      country: 'Europe',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/ireland-6717714b87c95.webp'
    },
    {
      id: 6,
      country: 'Malaysia',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/malaysiaStudy.webp'
    },
    {
      id: 7,
      country: 'Germany',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/europ-671771c9cc68d.webp'
    },
    {
      id: 8,
      country: 'Australia',
      img: 'https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/studydestination/australia.webp'
    }
  ]

  return (
    <div className='section__spacing'>
      <SectionHeading
        text='Destination'
        Icon={HiAcademicCap}
        title='Study '
        colorTitle='Destination'
        subtitle='Discover your ideal study destination with our expert guidance. We help you navigate the best global educational opportunities, tailored to your goals and ambitions. Start your journey towards academic success today!'
      />

      {/* study destination  */}
      <div className='common__top__spacing'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {studyDestinations.map(dest => (
            <div
              key={dest.id}
              className='relative group overflow-hidden rounded-md cursor-pointer'
            >
              <img
                src={dest.img}
                alt={dest.country}
                className='w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <span className='text-white text-4xl font-bold text-shadow-2xs group-hover:text-[#FF9100]'>
                  {dest.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
