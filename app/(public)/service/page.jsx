import Banner from '../_components/Banner/Banner'
import CTA from '../_components/CTA/CTA'
import OurService from '../_components/OurService/OurService'

export default function page () {
  return (
    <div>
      <Banner
        url='https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/banner/service-banner.png'
        colorText='Our'
        text='Service'
      />
      <OurService />
      <CTA />
    </div>
  )
}
