import React from 'react'
import Banner from '../_components/Banner/Banner'
import ContactForm from '../_components/ContactForm/ContactForm'

export default function page () {
  return (
    <div>
      <Banner
        colorText='Contact'
        text='Us'
        url='https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/banner/contact-us-banner.png'
      />
      <div className=' section__spacing'>
        <ContactForm />
      </div>
    </div>
  )
}
