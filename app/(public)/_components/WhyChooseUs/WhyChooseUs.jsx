'use client'
import React from 'react'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { FaStar, FaUsers, FaTrophy, FaHeadset, FaGlobe, FaBullseye, FaCheckCircle } from 'react-icons/fa'

export default function WhyChooseUs() {
    const whyChooseUsData = [
        {
            id: 1,
            title: 'EXPERTISE',
            icon: FaStar,
            description: 'Our team of highly qualified and experienced consultants brings deep industry knowledge and a student-friendly approach to every step of the admissions and visa process, ensuring accuracy, clarity, and confidence.'
        },
        {
            id: 2,
            title: 'PERSONALIZED ATTENTION',
            icon: FaUsers,
            description: 'We believe every student is unique. That\'s why we provide dedicated one-on-one guidance, carefully tailored to individual goals, strengths, and aspirations.'
        },
        {
            id: 3,
            title: 'PROVEN SUCCESS',
            icon: FaTrophy,
            description: 'Our track record speaks for itself. Students guided by us have secured placements in top-tier institutions worldwide and successfully built rewarding career paths.'
        },
        {
            id: 4,
            title: 'COMPREHENSIVE SUPPORT',
            icon: FaHeadset,
            description: 'From initial consultation to final destination, we offer end-to-end support throughout the entire educational journey—covering university selection, application processing, visa guidance, and beyond.'
        }
    ]

    return (
        <div className='bg-[#FFF9F3] py-20'>
            <div className='container mx-auto px-4'>
                <SectionHeading
                    text='Why Choose'
                    Icon={FaStar}
                    title='Why '
                    colorTitle='Choose Us'
                    subtitle='Discover what makes Northway Global the trusted partner for your educational journey abroad.'
                />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12'>
                    {whyChooseUsData.map(item => {
                        const Icon = item.icon
                        return (
                            <div
                                key={item.id}
                                className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:bg-gradient-to-br hover:from-[#FF9100] hover:to-[#FF6B00] cursor-pointer '
                            >
                                <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center mb-5 mx-auto transition-all duration-300'>
                                    <Icon className='text-[#FF9100]  text-3xl' />
                                </div>
                                <h3 className='text-xl font-bold text-center text-gray-800 group-hover:text-white mb-3'>
                                    {item.title}
                                </h3>
                                <p className='text-gray-600 group-hover:text-white text-center text-sm leading-relaxed'>
                                    {item.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}