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
      <div className='px-4 md:px-10  lg:px-12 xl:px-20'>
        <h2 className='headingText text-center text-3xl md:text-4xl font-bold mb-4'>
          <span className='text-[#ff9100]'>Our</span> Application Process
        </h2>
        <p className='heading__sub__text max-w-3xl mx-auto text-center text-gray-600 mb-12'>
          If you've decided to study at a university, you will have to gather
          the right documents to prove that you fit the university requirements.
          Provide complete personal information, previous qualifications,
          financial information, and a personal statement.
        </p>

        {/* Desktop/Tablet View - Full width cards with perfect arrow alignment */}
        <div className='hidden md:block overflow-x-auto pb-4 -mx-4 '>
          <div className='flex flex-row justify-start md:justify-center items-stretch gap-2 min-w-max'>
            {applicationProcess.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Full Card */}
                <div className='flex-shrink-0 w-[160px] xl:w-[160px]'>
                  <div className='bg-white rounded-xl p-5 text-center h-full flex flex-col shadow-sm hover:shadow-md transition-shadow'>
                    <div
                      className={`flex items-center justify-center w-16 h-16 mx-auto rounded-full border-2 border-dashed mb-4 ${
                        step.highlight
                          ? 'bg-[#ff9100]/10 text-[#ff9100] border-[#ff9100]'
                          : 'border-[#ff9100] text-[#ff9100] bg-white'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p className='text-xs font-medium text-black leading-tight min-h-[48px] flex items-center justify-center'>
                      {step.title}
                    </p>
                  </div>
                </div>
                
                {/* Arrow between cards - perfectly centered vertically */}
                {index < applicationProcess.length - 1 && (
                  <div className='flex-shrink-0 flex items-center'>
                    <FaArrowRight className='text-[#ff9100] text-xl font-bold' />
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
                <div className='bg-white rounded-xl p-5 text-center shadow-sm'>
                  <div
                    className={`flex items-center justify-center w-20 h-20 mx-auto rounded-full border-2 border-dashed mb-4 ${
                      step.highlight
                        ? 'bg-[#ff9100]/10 text-[#ff9100] border-[#ff9100]'
                        : 'border-gray-300 text-[#ff9100] bg-white'
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
                <FaArrowRight className='text-[#ff9100] text-2xl rotate-90' />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}