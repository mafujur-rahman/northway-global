'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa'
import { FaLocationArrow } from 'react-icons/fa6'
import { FiMenu, FiX } from 'react-icons/fi'

import logo from '../../../../public/logo.webp'
import Link from 'next/link'

export default function Navbar () {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const toggleDropdown = menu => {
    setDropdownOpen(dropdownOpen === menu ? null : menu)
  }

  return (
    <div>
      {/* Topbar - Fixed */}
      <div className='hidden lg:block fixed top-0 left-0 right-0 z-40'>
        <div className='grid grid-cols-[80%__20%] xl:grid-cols-[75%__25%] items-center justify-between w-full py-3 px-6 md:px-10 xl:px-20 bg-[#FEDDB1]'>
          {/* Contact Info */}
          <div className=''>
            <div className='space-y-1 md:space-y-0 flex items-center text-sm xl:text-base font-bold text-black/70 gap-x-6 lg:gap-x-8 xl:gap-x-16'>
              <h3>Dhaka office: +8801771660030</h3>
              <h3>USA office: +19179246493</h3>
              <h3>Australia office: +61449615940</h3>
            </div>
          </div>

          {/* Social Media Links */}
          <div className='flex justify-end'>
            <div className='flex space-x-4 text-lg text-gray-700 mt-2 md:mt-0'>
              <a
                href='https://facebook.com/northwayglobal'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebookF className='hover:text-[#FF9100]' />
              </a>
              <a
                href='https://twitter.com/northwayglobal'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTwitter className='hover:text-[#FF9100]' />
              </a>
              <a
                href='https://linkedin.com/northwayglobal'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedinIn className='hover:text-[#FF9100]' />
              </a>
              <a
                href='https://instagram.com/northwayglobal'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram className='hover:text-[#FF9100]' />
              </a>
              {/* <a
                href='https://youtube.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube className='hover:text-[#FF9100]' />
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Navbar - Below Topbar */}
      <div className='fixed top-0 left-0 right-0 z-50 bg-white px-4 md:px-10 xl:px-20 py-5 flex items-center justify-between shadow lg:top-[44px] 2xl:top-[48px]'>
        {/* Logo */}
        <div>
          <Link href={'/'}>
            <Image
              src={logo}
              alt='logo'
              height={1000}
              width={1000}
              className='h-auto w-32 object-cover'
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex items-center lg:space-x-3 xl:space-x-8 text-sm xl:text-lg font-semibold text-gray-700'>
          <Link href={'/'}>
            <li className='hover:text-[#FF9100] cursor-pointer'>Home</li>
          </Link>
          <Link href={'/about-us'}>
            <li className='hover:text-[#FF9100] cursor-pointer'>About Us</li>
          </Link>

          {/* Study Destination Dropdown - Changed Austria to Europe */}
          <li className='relative group cursor-pointer'>
            <span className='hover:text-[#FF9100]'>Study Destination ▾</span>
            <div className='absolute left-1/2 -translate-x-1/2 top-full mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg py-4 z-50'>
              <ul className='grid grid-cols-4 gap-5 w-[60rem] mx-auto justify-center items-center p-5'>
                {[
                  { name: 'USA', flag: 'us', url: '/usa' },
                  { name: 'UK', flag: 'gb', url: '/uk' },
                  { name: 'Canada', flag: 'ca', url: '/canada' },
                  { name: 'Australia', flag: 'au', url: '/australia' },
                  { name: 'Malaysia', flag: 'my', url: '/malaysia' },
                  { name: 'Europe', flag: 'eu', url: '/europe' },
                  { name: 'Germany', flag: 'de', url: '/germany' },
                  { name: 'Japan', flag: 'jp', url: '/japan' },
                  { name: 'China', flag: 'cn', url: '/china' },
                  { name: 'South Korea', flag: 'kr', url: '/south-korea' },
                  { name: 'Ireland', flag: 'ie', url: '/ireland' }
                ].map(country => (
                  <Link href={country.url} key={country.name}>
                    <li className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'>
                      <img
                        src={`https://flagcdn.com/w40/${country.flag}.png`}
                        alt={country.name}
                        className='w-6 h-5 object-cover rounded-sm'
                      />
                      {country.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </li>

          {/* Gallery Dropdown */}
          <li className='relative group cursor-pointer'>
            <span className='hover:text-[#FF9100]'>Gallery ▾</span>
            <ul className='absolute left-1/2 -translate-x-1/2 top-full mt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg py-2 w-48 z-50'>
              <Link href={'/photo-gallery'}>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  Photo Gallery
                </li>
              </Link>
              <Link href={'/video-gallery'}>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  Video Gallery
                </li>
              </Link>
            </ul>
          </li>

          <Link href={'/service'}>
            <li className='hover:text-[#FF9100] cursor-pointer'>Service</li>
          </Link>
          <Link href={'/blogs'}>
            <li className='hover:text-[#FF9100] cursor-pointer'>Blogs</li>
          </Link>
          <Link href={'/contact-us'}>
            <li className='hover:text-[#FF9100] cursor-pointer'>Contact Us</li>
          </Link>
        </ul>

        <div className='hidden lg:block'>
          <button
            onClick={() => setModalOpen(true)}
            className='flex items-center gap-2 bg-transparent text-[#ff9100] border border-[#ff9100] hover:bg-[#ff9100] hover:text-white font-semibold px-5 py-2 rounded-lg transition cursor-pointer'
          >
            Enquire Now <FaLocationArrow />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div
          className='lg:hidden text-2xl text-gray-700'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Spacer div to prevent content from hiding behind fixed topbar and navbar */}
      <div className='h-[50px] lg:h-[98px]'></div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className='lg:hidden bg-white shadow-lg px-6 py-4 space-y-2 font-medium text-gray-700 pt-16 pb-16'>
          <div>
            <Link href='/' onClick={() => setMenuOpen(!menuOpen)}>
              <li>Home</li>
            </Link>
          </div>
          <div>
            <Link href='/about-us' onClick={() => setMenuOpen(!menuOpen)}>
              <li>About Us</li>
            </Link>
          </div>
          <li>
            <button
              onClick={() => toggleDropdown('study')}
              className='w-full text-left'
            >
              Study Destination ▾
            </button>
            {dropdownOpen === 'study' && (
              <ul className='grid gap-5 items-center p-5'>
                {[
                  { name: 'USA', flag: 'us', url: '/usa' },
                  { name: 'UK', flag: 'gb', url: '/uk' },
                  { name: 'Canada', flag: 'ca', url: '/canada' },
                  { name: 'Australia', flag: 'au', url: '/australia' },
                  { name: 'Malaysia', flag: 'my', url: '/malaysia' },
                  { name: 'Europe', flag: 'eu', url: '/europe' },
                  { name: 'Germany', flag: 'de', url: '/germany' },
                  { name: 'Japan', flag: 'jp', url: '/japan' },
                  { name: 'China', flag: 'cn', url: '/china' },
                  { name: 'South Korea', flag: 'kr', url: '/south-korea' },
                  { name: 'Ireland', flag: 'ie', url: '/ireland' }
                ].map(country => (
                  <Link href={country.url} key={country.name}>
                    <li onClick={() => setMenuOpen(!menuOpen)} className='px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'>
                      <img
                        src={`https://flagcdn.com/w40/${country.flag}.png`}
                        alt={country.name}
                        className='w-6 h-5 object-cover rounded-sm'
                      />
                      {country.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleDropdown('gallery')}
              className='w-full text-left'
            >
              Gallery ▾
            </button>
            {dropdownOpen === 'gallery' && (
              <ul className='pl-4 mt-2 space-y-1'>
                <Link onClick={() => setMenuOpen(!menuOpen)} href='photo-gallery'>
                  <li>Photo Gallery</li>
                </Link>
                <Link onClick={() => setMenuOpen(!menuOpen)} href='video-gallery'>
                  <li>Video Gallery</li>
                </Link>
              </ul>
            )}
          </li>
          <div>
            <Link onClick={() => setMenuOpen(!menuOpen)} href='/service'>
              <li>Service</li>
            </Link>
          </div>
          <div>
            <Link onClick={() => setMenuOpen(!menuOpen)} href='/blogs'>
              <li>Blogs</li>
            </Link>
          </div>
          <div>
            <Link onClick={() => setMenuOpen(!menuOpen)} href='/contact-us'>
              <li>Contact Us</li>
            </Link>
          </div>
        </ul>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className='fixed inset-0 bg-black/60 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6 relative'>
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className='absolute top-3 right-3 text-gray-600 hover:text-black text-xl cursor-pointer'
            >
              <FiX />
            </button>

            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
              Enquire Now
            </h2>
            <form className='space-y-4'>
              <input
                type='text'
                placeholder='Full Name'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
              />
              <input
                type='email'
                placeholder='Email Address'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
              />
              <input
                type='tel'
                placeholder='Phone Number'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
              />
              <select className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'>
                <option value=''>Select Country</option>
                <option value='Bangladesh'>Bangladesh</option>
                <option value='USA'>USA</option>
                <option value='UK'>UK</option>
                <option value='Canada'>Canada</option>
                <option value='Australia'>Australia</option>
                <option value='Malaysia'>Malaysia</option>
                <option value='Europe'>Europe</option>
                <option value='Japan'>Japan</option>
                <option value='Ireland'>Ireland</option>
                <option value='South Korea'>South Korea</option>
                <option value='China'>China</option>
                <option value='Germany'>Germany</option>
              </select>
              <textarea
                placeholder='Your Message'
                rows='3'
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
              ></textarea>

              <button
                type='submit'
                className='w-full bg-[#FF9100] text-white font-semibold text-center justify-center items-center gap-x-1.5 inline-flex py-2 rounded-lg transition cursor-pointer'
              >
                Submit Enquiry <FaLocationArrow />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}