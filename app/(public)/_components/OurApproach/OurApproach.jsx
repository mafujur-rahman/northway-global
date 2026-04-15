'use client'
import React from 'react'
import { FaGlobe } from 'react-icons/fa'

export default function OurApproach() {
    return (
        <div className='bg-white py-20'>
            <div className='container mx-auto px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <div className='inline-block p-3 bg-[#FFF9F3] rounded-full mb-6'>
                        <FaGlobe className='text-[#FF9100] text-3xl' />
                    </div>
                    <h2 className='text-3xl md:text-4xl font-bold mb-6 text-gray-800'>
                        Our <span className='text-[#FF9100]'>Approach</span>
                    </h2>
                    <p className='text-lg text-gray-600 leading-relaxed'>
                        At Northway Global, we follow a holistic, student-centered approach. We invest time in understanding each client's unique needs, strengths, and aspirations. Our team of experienced consultants and educators collaborates closely to design personalized strategies that maximize both educational and long-term career opportunities.
                    </p>
                </div>
            </div>
        </div>
    )
}