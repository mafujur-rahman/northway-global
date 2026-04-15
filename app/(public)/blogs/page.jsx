import React from 'react'
import Banner from '../_components/Banner/Banner'
import BlogCmp from '../_components/BlogCmp/BlogCmp'

export default function page () {
  return (
    <div>
      <Banner
        colorText='Blogs'
        text=''
        url='https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/banner/video-gallery-banner.png'
      />
      <BlogCmp />
    </div>
  )
}
