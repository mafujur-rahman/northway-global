'use client'
import React from 'react'
import { FaBullseye, FaCheckCircle, FaArrowRight } from 'react-icons/fa'

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
      {/* Decorative Background Elements */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-[#FF9100]/5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-[#FF9100]/5 rounded-full blur-3xl'></div>
      
      <div className='container mx-auto px-4 relative z-10'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold  mb-4'>
            Our <span className='text-[#FF9100]'>Goals</span>
          </h2>
          <p className='/80 text-lg max-w-2xl mx-auto'>
            Our consultants are highly qualified professionals with extensive experience in admissions and visa processes.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {goalsData.map(goal => {
            const Icon = goal.icon
            return (
              <div 
                key={goal.id}
                className='group relative bg-white backdrop-blur-sm rounded-2xl p-8 border border-black/10 '
              >
                <div className='flex items-start gap-5 mb-4'>
                  <div className='w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300'>
                    <Icon className='text-[#FF9100] text-3xl' />
                  </div>
                  <div className='flex-1'>
                    <span className='inline-block  py-1 bg-white/20 rounded-full  text-xs font-semibold mb-2'>
                      {goal.title}
                    </span>
                    <h3 className='text-2xl font-bold '>
                      {goal.highlight}
                    </h3>
                  </div>
                </div>
                
                <p className=' text-base leading-relaxed mb-5 pl-1'>
                  {goal.description}
                </p>
                
                <div className='flex items-center justify-start pt-3 border-t border-black/10'>
                  <span className=' text-sm  transition-colors flex items-center gap-2'>
                    Learn more <FaArrowRight className='text-xs group-hover:translate-x-1 transition-transform' />
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