'use client'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FiMinus, FiPlus } from 'react-icons/fi'



export default function FaqArea ({ countryName = 'USA' , faqsData , des}) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFaq = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className='section__spacing '>
      <div>
        <div className='grid lg:grid-cols-8 gap-20'>
          {/* Left: FAQs */}
          <div className='lg:col-span-5 space-y-2'>
            <div className='mb-5'>
              <h3 className='headingText'>
                Study in{' '}
                <span className='heading__color__text'>{countryName}</span>{' '}
                FAQ's
              </h3>
              <p className='text-lg max-w-3xl '>
                {des}
              </p>
            </div>

            {faqsData.map((faq, index) => (
              <div key={index} className=' pb-4 bg-white rounded-lg'>
                <button
                  onClick={() => toggleFaq(index)}
                  className='w-full pt-5  px-5 rounded-lg text-left flex justify-between items-center text-base text-black/70 font-semibold focus:outline-none cursor-pointer'
                >
                  {faq.title}
                  <span className='ml-2 text-orange-500'>
                    {openIndex === index ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                {openIndex === index && (
                  <p className='mt-2 text-gray-700 px-5 rounded-lg'>
                    {faq.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: Single image */}
          <div className='lg:col-span-3 flex justify-center'>
            <img
              src='https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/faq-66dc00ae9d778.webp'
              alt='Study in USA'
              className='w-full h-auto rounded-lg  object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
