import React from 'react'
import TooltipBtn from '../../utlities/TooltipBtn/TooltipBtn'

export default function EducationCost ({educationCostData}) {
 
  return (
    <div className='section__spacing'>
      {educationCostData?.map(item => (
        <div key={item.id} className='grid lg:grid-cols-2 items-center gap-16 h-full'>
          <img
            src={item.image}
            alt={item.title}
            className='w-full h-[50vh] object-cover rounded-lg '
          />

          <div>
            <TooltipBtn text={item.tooltipText} />
            <h3 className='headingText'>
              {item.title}{' '}
              <span className='banner__color__title'>{item.colorText}</span>
            </h3>

            <p className='heading__sub__text'>{item.description}</p>

            <div className='mt-10'>
              <h4 className='text__medium mb-2'>{item.quickFactsTitle}</h4>
              <ul className='list-disc list-inside heading__sub__text'>
                {item.quickFacts.map(fact => (
                  <li key={fact.id}>{fact.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}