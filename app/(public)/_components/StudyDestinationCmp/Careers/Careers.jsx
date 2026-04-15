import React from 'react'
import TooltipBtn from '../../utlities/TooltipBtn/TooltipBtn'

export default function Careers ({ careersData }) {
  const renderDescription = (description) => {
    if (Array.isArray(description)) {
      return description.map((paragraph, idx) => (
        <p key={idx} className="heading__sub__text mb-4">
          {paragraph}
        </p>
      ))
    }
    return <p className="heading__sub__text">{description}</p>
  }

  return (
    <div className='section__spacing'>
      {careersData?.map(item => (
        <div key={item.id} className='grid lg:grid-cols-2 items-center gap-16 h-full'>
          <div>
            <TooltipBtn text={item.tooltipText} />
            <h3 className='headingText'>
              {item.title}{' '}
              <span className='banner__color__title'>{item.colorText}</span>
            </h3>

            {renderDescription(item.description)}
          </div>
          <img
            src={item.image}
            alt={item.title}
            className='w-full h-[50vh] object-cover rounded-lg '
          />
        </div>
      ))}
    </div>
  )
}