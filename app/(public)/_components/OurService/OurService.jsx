'use client'
import React from 'react'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { FaPlane, FaPassport, FaGraduationCap, FaFileAlt } from 'react-icons/fa'
import { MdOutlineLocalOffer } from 'react-icons/md'

export default function OurService() {
  const servicesData = [
    {
      id: 1,
      title: 'Admission & Visa Support',
      icon: FaPlane,
      items: [
        'Free Consultation',
        'Course, country & university selection',
        'Submit Application & admission strategy',
        'Interview preparation',
        'Scholarship and financial aid guidance',
        'Receive Offer Letter',
        'Pay Tuition Fees',
        'Visa application and processing',
        'Fly Abroad',
        'Prepare for departure'
      ]
    },
    {
      id: 2,
      title: 'Document Support',
      icon: FaFileAlt,
      items: [
        'Recommendation Letter Writing Support',
        'SOP Writing Support',
        'CV/Resume Writing Support',
        'Affidavit & Legalization support',
        'Asset Valuation Support',
        'Translation'
      ]
    },
    {
      id: 3,
      title: 'Financial & Bank Guidance',
      icon: FaPassport,
      items: [
        'Bank Statement',
        'Bank Loan',
        'Application & Tuition fee Payment',
        'Sponsor documents',
        'Financial planning'
      ]
    },
    {
      id: 4,
      title: 'Academic Support',
      icon: FaGraduationCap,
      items: [
        'English Proficiency Test Guideline (IELTS, PTE, DTE, OIETC, TOEFL, etc.)',
        'Academic Test Guideline (GRE, GMAT, SAT, ACT, etc.)',
        'Academic Document Evaluation',
        'Free Mock for University Interview'
      ]
    }
  ]

  return (
    <div className='section__spacing bg-[#FFF9F3]'>
      <div className='py-20 container mx-auto px-4'>
        <SectionHeading
          text='Service'
          Icon={MdOutlineLocalOffer}
          title='Our '
          colorTitle='Service'
          subtitle='We provide the best services to meet the needs of our clients. With a focus on quality and customer satisfaction, we aim to deliver exceptional solutions tailored to each individual. From personalized consultations to innovative solutions, our team is dedicated to helping you succeed every step of the way.'
        />

        <section className='common__top__spacing mt-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {servicesData.map(service => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:bg-gradient-to-br hover:from-[#FF9100] hover:to-[#FF6B00] flex flex-col h-full'
                >
                  <div className='text-[#FF9100] group-hover:text-white text-4xl mb-4 transition-colors'>
                    <Icon />
                  </div>
                  <h3 className='text-xl font-bold text-black/80 group-hover:text-white mb-4 pb-2 border-b-2 border-[#FF9100]/20 group-hover:border-white/30 inline-block'>
                    {service.title}
                  </h3>

                  {/* Scrollable content area for long lists */}
                  <div className={`flex-1 ${service.items.length > 8 ? 'overflow-y-auto max-h-[280px]' : ''} pr-1 custom-scrollbar`}>
                    <ul className='space-y-2'>
                      {service.items.map((item, idx) => (
                        <li key={idx} className='flex items-start gap-2 text-sm group-hover:text-white text-gray-600'>
                          <span className='text-[#FF9100] group-hover:text-white text-base mt-0.5 flex-shrink-0'>▹</span>
                          <span className='leading-relaxed'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional: Show item count badge */}
                  <div className='mt-4 pt-3 border-t border-gray-100 group-hover:border-white/20'>
                    <span className='text-xs text-gray-400 group-hover:text-white/70'>
                      {service.items.length} services included
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF9100;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FF6B00;
        }
        .group:hover .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.2);
        }
        .group:hover .custom-scrollbar::-webkit-scrollbar-thumb {
          background: white;
        }
      `}</style>
    </div>
  )
}