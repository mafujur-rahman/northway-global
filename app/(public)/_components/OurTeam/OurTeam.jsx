import React from 'react'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { GiTeamIdea } from 'react-icons/gi'
import { HiOutlineMail } from 'react-icons/hi'

export default function OurTeam() {
  const teamMembers = [
    {
      id: 1,
      name: 'Mehedi Hasan',
      image: '/team/Mehedi Hasan.jpeg',
    },
    {
      id: 2,
      name: 'Mahmudul Hasan',
      image: '/team/Mahmudul Hasan.jpeg',
    },
    {
      id: 3,
      name: 'Farzana Yeasmin',
      image: '/team/Farzana Yeasmin.jpeg',
    },
    {
      id: 4,
      name: 'Qumruzzaman',
      image: '/team/Qumruzzaman.jpeg',
    },
    {
      id: 5,
      name: 'Shamima Akter',
      image: '/team/Shamima Akter.jpeg',
    },
    {
      id: 6,
      name: 'Abul Hayat',
      image: '/team/Abul hayat.jpeg',
    }
  ]

  return (
    <div className='section__spacing'>
      <SectionHeading
        text='Team'
        Icon={GiTeamIdea}
        title='Meet '
        colorTitle='Our Team'
        subtitle='Meet our amazing team members who bring everything together.'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8 my-16'>
        {teamMembers.map(member => (
          <div key={member.id} className='group text-center'>

            {/* Image */}
            <div className='relative overflow-hidden rounded-xl'>
              <img
                src={member.image}
                alt={member.name}
                className='w-full h-[35vh] object-cover bg-gray-50 rounded-xl transition duration-700 group-hover:scale-105'
              />

              {/* Hover Message Icon */}
              <div className='absolute top-3 right-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300'>
                <button className='p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-[#ff9100] hover:text-white transition shadow'>
                  <HiOutlineMail size={18} />
                </button>
              </div>
            </div>

            {/* Name */}
            <h3 className='mt-4 text__medium'>{member.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}