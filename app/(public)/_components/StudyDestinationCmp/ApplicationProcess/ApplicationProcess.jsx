import React from 'react'
import {
  FaUserCheck,
  FaUsers,
  FaSearch,
  FaFileAlt,
  FaGraduationCap,
  FaLaptop,
  FaChalkboardTeacher,
  FaArrowRight
} from 'react-icons/fa'
import { SiVisa } from 'react-icons/si'

const applicationProcess = [
  { id: 1, title: 'Clients profile review', icon: <FaUserCheck size={24} /> },
  { id: 2, title: 'Onboarding meeting', icon: <FaUsers size={24} /> },
  { id: 3, title: 'University search', icon: <FaSearch size={24} /> },
  { id: 4, title: 'Statement of purpose', icon: <FaFileAlt size={24} /> },
  { id: 5, title: 'University Shortlist', icon: <FaGraduationCap size={24} /> },
  { id: 6, title: 'University application', icon: <FaLaptop size={24} /> },
  {
    id: 7,
    title: 'Arranging mock interview',
    icon: <FaChalkboardTeacher size={24} />
  },
  {
    id: 8,
    title: 'Visa application',
    icon: <SiVisa size={24} />,
    highlight: true
  }
]

export default function ApplicationProcess () {
  return (
    <section className=''>
      <div className='section__spacing'>
        <h2 className='headingText text-center'>
          <span className='text-[#ff9100]'>Our</span> Application Process
        </h2>
        <p className='heading__sub__text max-w-3xl mx-auto text-center mb-12'>
          If you’ve decided to study at a university, you will have to gather
          the right documents to prove that you fit the university requirements.
          Provide complete personal information, previous qualifications,
          financial information, and a personal statement.
        </p>

        {/* Using grid for perfect alignment */}
        <div className='grid grid-cols-1 md:grid-cols-8 gap-4 md:gap-2 items-start'>
          {applicationProcess.map((step, index) => (
            <div key={step.id} className='flex flex-col items-center text-center relative'>
              {/* Circle */}
              <div
                className={`flex items-center justify-center size-16 md:size-20 rounded-full border-2 border-dashed ${
                  step.highlight
                    ? 'bg-[#ff9100] text-white border-[#ff9100]'
                    : 'border-gray-400 text-gray-700'
                }`}
              >
                {step.icon}
              </div>
              <p className='mt-3 text-xs md:text-sm font-medium text-gray-700 leading-tight'>
                {step.title}
              </p>
              
              {/* Arrow for all except last - positioned absolutely */}
              {index < applicationProcess.length - 1 && (
                <div className='hidden md:block absolute -right-4 top-8 transform translate-y-0'>
                  <FaArrowRight className='text-gray-400 text-xl' />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile view with arrows between */}
        <div className='md:hidden flex flex-col items-center gap-4 mt-8'>
          {applicationProcess.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className='flex flex-col items-center text-center w-full max-w-[200px] mx-auto'>
                <div
                  className={`flex items-center justify-center size-16 rounded-full border-2 border-dashed ${
                    step.highlight
                      ? 'bg-[#ff9100] text-white border-[#ff9100]'
                      : 'border-gray-400 text-gray-700'
                  }`}
                >
                  {step.icon}
                </div>
                <p className='mt-2 text-sm font-medium text-gray-700'>
                  {step.title}
                </p>
              </div>
              {index < applicationProcess.length - 1 && (
                <FaArrowRight className='text-gray-400 text-xl rotate-90' />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}