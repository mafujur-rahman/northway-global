'use client'
import React from 'react'
import Banner from '../_components/Banner/Banner'
import AboutUs from '../_components/AboutUs/AboutUs'
import MissionVision from '../_components/MissionVision/MissionVision'
import OurService from '../_components/OurService/OurService'
import OurTeam from '../_components/OurTeam/OurTeam'
import Testimonial from '../_components/Testimonial/Testimonial'

export default function page () {
  return (
    <div>
      <Banner
        colorText='About'
        text='Us'
        url='https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/banner/about-us-banner.png'
      />
      <AboutUs heading='Who' colorText='We Are'/> 
      <OurTeam />
      <OurService />
      <MissionVision />
      <Testimonial />
    </div>
  )
}
