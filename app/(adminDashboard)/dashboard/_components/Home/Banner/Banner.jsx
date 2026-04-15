import React from 'react'

import { FaBlog, FaRegImage, FaVideo, FaQuoteRight } from 'react-icons/fa'
export default function Banner () {
  const statsData = [
    {
      id: 1,
      title: 'Total Blogs ',
      number: 120,
      description: 'Total published blogs that share insights and updates.',
      icon: FaBlog
    },
    {
      id: 2,
      title: 'Total Photos ',
      number: 450,
      description: 'A collection of uploaded images across the platform.',
      icon: FaRegImage
    },
    {
      id: 3,
      title: 'Total Videos ',
      number: 75,
      description: 'Videos uploaded to engage and inform the audience.',
      icon: FaVideo
    },
    {
      id: 4,
      title: 'Total Testimonials ',
      number: 32,
      description: 'Client feedback and testimonials uploaded so far.',
      icon: FaQuoteRight
    }
  ]

  return (
    <div className='card__container'>
      {statsData.map(item => (
        <div key={item.id} className='card__parent group'>
          <div className='flex items-center gap-2'>
            <item.icon className='text-xl group-hover:text-[#ff9100]' />
            <h3 className='card__title'> {item.title}</h3>
          </div>
          <p className='card__main__title '>
            {item.number}
          </p>
          <p className='card__base__text'>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
