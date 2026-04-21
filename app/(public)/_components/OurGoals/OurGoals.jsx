'use client'
import React from 'react'
import { FaBullseye, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'


export default function OurGoals() {
  const goalsData = [
    {
      id: 1,
      title: 'GOAL 1',
      icon: FaBullseye,
      description: 'Selecting the right program aligned with a clear career-focused plan.',
      highlight: 'Program Selection'
    },
    {
      id: 2,
      title: 'GOAL 2',
      icon: FaCheckCircle,
      description: 'Achieving visa success.',
      highlight: 'Visa Success'
    }
  ]

  return (
    <div className='section__spacing relative overflow-hidden'>
      
      <div className='container mx-auto  relative z-10'>
        {/* Section Heading Component */}
        <SectionHeading
          text='Goals'
          Icon={FaBullseye}
          title='Our '
          colorTitle='Goals'
          subtitle='Our consultants are highly qualified professionals with extensive experience in admissions and visa processes.'
        />

        {/* Cards Container - Fixed button alignment */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12'>
          {goalsData.map(goal => {
            const Icon = goal.icon
            return (
              <div 
                key={goal.id}
                className='group relative bg-white backdrop-blur-sm rounded-2xl p-8 border border-black/10 flex flex-col h-full'
              >
                <div className='flex items-start gap-5 mb-4'>
                  {/* Icon wrapper with self-stretch to match height */}
                  <div className='flex-shrink-0'>
                    <div className='w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300'>
                      <Icon className='text-[#FF9100] text-3xl' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <span className='inline-block py-1 bg-white/20 rounded-full text-xs font-semibold mb-2'>
                      {goal.title}
                    </span>
                    <h3 className='text-2xl font-bold leading-tight'>
                      {goal.highlight}
                    </h3>
                  </div>
                </div>
                
                {/* Description with flex-grow to push button down */}
                <p className='text-base leading-relaxed mb-5 pl-1 flex-grow'>
                  {goal.description}
                </p>
                
                {/* Button - Now always at bottom */}
                <div className='flex items-center justify-start pt-3 border-t border-black/10 mt-auto'>
                  <span className='text-sm transition-colors flex items-center gap-2 cursor-pointer group/btn'>
                    Learn more <FaArrowRight className='text-xs group-hover/btn:translate-x-1 transition-transform' />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}