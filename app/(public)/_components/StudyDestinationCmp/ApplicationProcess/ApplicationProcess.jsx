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
  { id: 1, title: 'Student profile review', icon: <FaUserCheck size={24} /> },
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

export default function ApplicationProcess() {
  return (
    <section className='w-full mt-[10vh]  xl:mt-[15vh]  px-4 md:px-10  lg:px-12 xl:px-20'>
      <div className='w-full'>
        {/* Header section */}
        <div className='w-full flex flex-col items-center justify-center mb-8 '>
          <h2 className='headingText text-center text-3xl md:text-4xl font-bold mb-4'>
            <span className='text-[#ff9100]'>Our</span> Application Process
          </h2>
          <p className='heading__sub__text max-w-3xl mx-auto text-center text-gray-600'>
            If you've decided to study at a university, you will have to gather
            the right documents to prove that you fit the university requirements.
            Provide complete personal information, previous qualifications,
            financial information, and a personal statement.
          </p>
        </div>

        {/* Desktop View - Auto scroll only when needed */}
        <div className='hidden md:block w-full '>
          <div className='overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar'>
            <div className='flex flex-row items-stretch gap-2 justify-start 2xl:justify-center '>
              {/* Logo Card */}
              <div className='flex-shrink-0 w-[150px]'>
                <div className='bg-white rounded-xl p-3 text-center h-full flex flex-col shadow-sm hover:shadow-md transition-shadow items-center justify-center'>
                  <img 
                    src="/logo.webp" 
                    alt="Northway Global" 
                    className="w-24 h-24 object-contain mb-3"
                  />
                </div>
              </div>
              
              {/* Arrow after logo */}
              <div className='flex-shrink-0 flex items-center'>
                <FaArrowRight className='text-[#ff9100] text-base md:text-lg font-bold' />
              </div>
              
              {/* Process Steps */}
              {applicationProcess.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Card */}
                  <div className='flex-shrink-0 w-[150px]'>
                    <div className='bg-white rounded-xl p-3 text-center h-full flex flex-col shadow-sm hover:shadow-md transition-shadow'>
                      <div
                        className={`flex items-center justify-center w-14 h-14 mx-auto rounded-full border-2 border-dashed mb-3 ${
                          step.highlight
                            ? 'bg-[#ff9100]/10 text-[#ff9100] border-[#ff9100]'
                            : 'border-[#ff9100] text-[#ff9100] bg-white'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <p className='text-[10px] md:text-xs font-medium text-black leading-tight min-h-[40px] flex items-center justify-center'>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow between cards */}
                  {index < applicationProcess.length - 1 && (
                    <div className='flex-shrink-0 flex items-center'>
                      <FaArrowRight className='text-[#ff9100] text-base md:text-lg font-bold' />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile View */}
        <div className='md:hidden flex flex-col items-center gap-3 px-4'>
          {/* Logo item for mobile */}
          <div className='w-full max-w-[280px]'>
            <div className='bg-white rounded-xl p-3 text-center shadow-sm flex flex-col items-center justify-center'>
              <img 
                src="/logo.webp" 
                alt="Northway Global" 
                className="w-14 h-14 object-contain mb-3"
              />
              <p className='text-xs font-medium text-gray-700'>
                Northway Global
              </p>
            </div>
          </div>
          <FaArrowRight className='text-[#ff9100] text-xl rotate-90' />
          
          {/* Process steps for mobile */}
          {applicationProcess.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className='w-full max-w-[280px]'>
                <div className='bg-white rounded-xl p-3 text-center shadow-sm'>
                  <div
                    className={`flex items-center justify-center w-14 h-14 mx-auto rounded-full border-2 border-dashed mb-3 ${
                      step.highlight
                        ? 'bg-[#ff9100]/10 text-[#ff9100] border-[#ff9100]'
                        : 'border-gray-300 text-[#ff9100] bg-white'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p className='text-xs font-medium text-gray-700 min-h-[40px] flex items-center justify-center'>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < applicationProcess.length - 1 && (
                <FaArrowRight className='text-[#ff9100] text-xl rotate-90' />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </section>
  )
}