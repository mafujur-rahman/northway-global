import Banner from '../_components/Banner/Banner'
import PhotoGalleryCmp from '../_components/PhotoGalleryCmp/PhotoGalleryCmp'

export default function page () {
  return (
    <div>
      <Banner colorText="Photo" text="Gallery" url="https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/banner/photo-gallery-banner.png"/>
      <PhotoGalleryCmp />
    </div>
  )
}
