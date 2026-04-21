'use client'
import React from 'react'
import { FaGlobe } from 'react-icons/fa'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'


export default function OurApproach() {
    return (
        <div className='section__spacing'>
            <SectionHeading
                text='Approach'
                Icon={FaGlobe}
                title='Our '
                colorTitle='Approach'
                subtitle="At Northway Global, we follow a holistic, student-centered approach. We invest time in understanding each client\'s unique needs, strengths, and aspirations. Our team of experienced consultants and educators collaborates closely to design personalized strategies that maximize both educational and long-term career opportunities."
            />
        </div>
    )
}