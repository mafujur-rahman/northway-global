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
  { id: 1, title: 'Clients profile review', icon: <FaUserCheck size={28} /> },
  { id: 2, title: 'Onboarding meeting', icon: <FaUsers size={28} /> },
  { id: 3, title: 'University search', icon: <FaSearch size={28} /> },
  { id: 4, title: 'Statement of purpose', icon: <FaFileAlt size={28} /> },
  { id: 5, title: 'University Shortlist', icon: <FaGraduationCap size={28} /> },
  { id: 6, title: 'University application', icon: <FaLaptop size={28} /> },
  {
    id: 7,
    title: 'Arranging mock interview',
    icon: <FaChalkboardTeacher size={28} />
  },
  {
    id: 8,
    title: 'Visa application',
    icon: <SiVisa size={28} />,
    highlight: true
  }
]

export default function ApplicationProcess() {
  return (
    <section className='section__spacing'>
      <div className='container mx-auto px-4'>
        <h2 className='headingText text-center text-3xl md:text-4xl font-bold mb-4'>
          <span className='text-[#ff9100]'>Our</span> Application Process
        </h2>
        <p className='heading__sub__text max-w-3xl mx-auto text-center text-gray-600 mb-12'>
          If you've decided to study at a university, you will have to gather
          the right documents to prove that you fit the university requirements.
          Provide complete personal information, previous qualifications,
          financial information, and a personal statement.
        </p>

        {/* Desktop/Tablet View - Single horizontal line with proper overflow handling */}
        <div className='hidden md:block overflow-x-auto pb-4 -mx-4 px-4'>
          <div className='flex flex-row justify-start md:justify-center items-center gap-2 min-w-max'>
            {applicationProcess.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Card */}
                <div className='flex-shrink-0 w-[130px]'>
                  <div className='bg-white rounded-xl p-4 text-center h-full flex flex-col'>
                    <div
                      className={`flex items-center justify-center w-16 h-16 mx-auto rounded-full border-2 border-dashed mb-3 ${
                        step.highlight
                          ? 'bg-[#ff9100] text-white border-[#ff9100]'
                          : 'border-gray-300 text-gray-700 bg-white'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p className='text-xs font-medium text-gray-700 leading-tight min-h-[32px] flex items-center justify-center'>
                      {step.title}
                    </p>
                  </div>
                </div>
                
                {/* Arrow between cards */}
                {index < applicationProcess.length - 1 && (
                  <div className='flex-shrink-0'>
                    <FaArrowRight className='text-[#ff9100] text-2xl font-bold' />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Mobile View - Column with arrows pointing down */}
        <div className='md:hidden flex flex-col items-center gap-3'>
          {applicationProcess.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className='w-full max-w-[280px]'>
                <div className='bg-white rounded-xl p-4 text-center'>
                  <div
                    className={`flex items-center justify-center w-20 h-20 mx-auto rounded-full border-2 border-dashed mb-3 ${
                      step.highlight
                        ? 'bg-[#ff9100] text-white border-[#ff9100]'
                        : 'border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p className='text-sm font-medium text-gray-700 min-h-[40px] flex items-center justify-center'>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < applicationProcess.length - 1 && (
                <FaArrowRight className='text-[#ff9100] text-3xl rotate-90' />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}