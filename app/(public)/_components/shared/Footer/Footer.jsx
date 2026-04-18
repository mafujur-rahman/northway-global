'use client'
import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight
} from 'react-icons/fa'
import logo from '../../../public/logo.webp'
import BaseBtn from '../../utlities/CommonBtn/BaseBtn'

export default function Footer() {
  // Common email for all offices
  const commonEmail = 'infonorthwaybd@gmail.com'

  return (
    <footer className=''>
      {/* Call to Action Section - No gap on top */}
      <div className='section__spacing bg-white py-8 md:py-12 text-center rounded-2xl'>
        <div className='max-w-3xl mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Ready to Start Your Journey?
          </h2>
          <p className='text-gray-600 text-base md:text-lg mb-6'>
            Let us help you achieve your goals with our expert guidance and support.
            Get in touch with us today to begin your success story.
          </p>
          <BaseBtn
            text='Get Started Now'
            link='/contact-us'
            icon={FaArrowRight}
            className='bg-[#ff9100] text-white'
          />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className='bg-[#FFF9F3]  px-4 md:px-10  lg:px-12 xl:px-20 common__top__section__spacing'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8'>
          {/* Company Info */}
          <div>
            <div>
              <Image
                alt='logo'
                src={logo}
                height={1000}
                width={1000}
                className='w-42 object-cover'
              />
            </div>
            <p className='text__base my-2.5'>
              Copyright © 2026 Northway Global. All rights reserved. Let's build a beautiful tomorrow.
            </p>

            <div className='flex space-x-4'>
              <a href='https://facebook.com/northwayglobal' target='_blank' className='p-2 bg-[#ff9100] rounded-full text-white hover:bg-[#e68200] transition-colors'>
                <FaFacebookF />
              </a>
              <a href='https://instagram.com/northwayglobal' target='_blank' className='p-2 bg-[#ff9100] rounded-full text-white hover:bg-[#e68200] transition-colors'>
                <FaInstagram />
              </a>
              <a href='https://linkedin.com/northwayglobal' target='_blank' className='p-2 bg-[#ff9100] rounded-full text-white hover:bg-[#e68200] transition-colors'>
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links - Moved to the right on large screens */}
          <div className='lg:pl-8 xl:pl-12'>
            <ul className='space-y-1 text-base'>
              <li>
                <a
                  href='/about-us'
                  className='underline hover:text-[#FF9100] underline-offset-2 transition-colors'
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href='/service'
                  className='underline hover:text-[#FF9100] underline-offset-2 transition-colors'
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href='/photo-gallery'
                  className='underline hover:text-[#FF9100] underline-offset-2 transition-colors'
                >
                  Photo Gallery
                </a>
              </li>
              <li>
                <a
                  href='/blogs'
                  className='underline hover:text-[#FF9100] underline-offset-2 transition-colors'
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href='/contact-us'
                  className='underline hover:text-[#FF9100] underline-offset-2 transition-colors'
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Dhaka Office */}
          <div>
            <ul>
              <li className='space-y-2 text-base'>
                <p className='text__medium flex items-center gap-2'>
                  Dhaka Office
                </p>
                <div className='space-y-1.5'>
                  <div className='flex items-start gap-2 min-h-[48px]'>
                    <FaMapMarkerAlt className='text-[#FF9100] shrink-0 mt-0.5' size={12} />
                    <span className='flex-1'>Kha-12/2, Shahjadpur, Gulshan, Dhaka-1212</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaPhoneAlt className='text-[#FF9100] shrink-0' size={12} />
                    <a href='tel:+8801771660030'>+8801771660030</a>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaEnvelope className='text-[#FF9100] shrink-0' size={12} />
                    <a href={`mailto:${commonEmail}`}>{commonEmail}</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* USA Office */}
          <div>
            <ul>
              <li className='space-y-2 text-base'>
                <p className='text__medium flex items-center gap-2'>
                  USA Office
                </p>
                <div className='space-y-1.5'>
                  <div className='flex items-start gap-2 min-h-[48px]'>
                    <FaMapMarkerAlt className='text-[#FF9100] shrink-0 mt-0.5' size={12} />
                    <span className='flex-1'>37 -22 73 Rd St (2nd floor), Jackson Heights NY, 11372</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaPhoneAlt className='text-[#FF9100] shrink-0' size={12} />
                    <a href='tel:+19179246493'>+19179246493</a>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaEnvelope className='text-[#FF9100] shrink-0' size={12} />
                    <a href={`mailto:${commonEmail}`}>{commonEmail}</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Australia Office */}
          <div>
            <ul>
              <li className='space-y-2 text-base'>
                <p className='text__medium flex items-center gap-2'>
                  Australia Office
                </p>
                <div className='space-y-1.5'>
                  <div className='flex items-start gap-2 min-h-[48px]'>
                    <FaMapMarkerAlt className='text-[#FF9100] shrink-0 mt-0.5' size={12} />
                    <span className='flex-1'>3/4 Nellie Ave Mitchell, Park SA, 5043</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaPhoneAlt className='text-[#FF9100] shrink-0' size={12} />
                    <a href='tel:+61449615940'>+61449615940</a>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaEnvelope className='text-[#FF9100] shrink-0' size={12} />
                    <a href={`mailto:${commonEmail}`}>{commonEmail}</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-black/10 mt-10 pt-4 text-center text-sm font-medium text-black/70 pb-5'>
          <p>
            Designed and Developed By{' '}
            <span className='text-black'>Ethical Den</span>
          </p>
        </div>
      </div>
    </footer>
  )
}