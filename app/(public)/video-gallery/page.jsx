import React from 'react'
import Banner from '../_components/Banner/Banner'
import VideoGalleryCmp from '../_components/VideoGalleryCmp/VideoGalleryCmp'

export default function page () {
  return (
    <div>
      <Banner
        colorText='Video'
        text='Gallery'
        url='https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/banner/video-gallery-banner.png'
      />
      <div className=' section__spacing'>
        <VideoGalleryCmp />
      </div>
    </div>
  )
}
