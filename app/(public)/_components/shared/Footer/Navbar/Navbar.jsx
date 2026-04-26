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
import toast, { Toaster } from 'react-hot-toast'

import logo from '../../../../public/logo.webp'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Form state - Updated fields
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    program: '',
    subject: '',
    mobile: ''
  })

  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const toggleDropdown = menu => {
    setDropdownOpen(dropdownOpen === menu ? null : menu)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Validate form - only mobile is required
  const validateForm = () => {
    const errors = {}

    // Only mobile number is required
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required'
    } else if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,6}[-\s\.]?[0-9]{3,6}$/.test(formData.mobile)) {
      // Basic phone number validation - accepts international formats
      errors.mobile = 'Please enter a valid mobile number'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setLoading(true)

    try {
      // API call to submit enquiry
      const response = await fetch('https://api.northwayglobal.com.bd/api/contact/enquiry/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Enquiry submitted successfully:', data)
        
        // Show success toast
        toast.success('Enquiry submitted successfully! We will contact you soon.', {
          duration: 4000,
          position: 'top-center',
        })
        
        // Reset form
        setFormData({
          name: '',
          country: '',
          program: '',
          subject: '',
          mobile: ''
        })
        
        // Close modal after 2 seconds
        setTimeout(() => {
          setModalOpen(false)
          setFormErrors({})
        }, 2000)
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        toast.error('Failed to submit enquiry. Please try again later.')
      }
    } catch (err) {
      console.error('Submission error:', err)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setFormErrors({})
    setFormData({
      name: '',
      country: '',
      program: '',
      subject: '',
      mobile: ''
    })
  }

  // Close mobile menu when clicking on a link
  const closeMenu = () => {
    setMenuOpen(false)
    setDropdownOpen(null)
  }

  return (
    <div>
      {/* Toaster component for toast notifications */}
      <Toaster />

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

          {/* Study Destination Dropdown */}
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
                    <li className='px-4 py-2 hover:bg-[#FFF9F3] flex items-center gap-2 cursor-pointer'>
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

          <Link href={'/service'}>
            <li className='hover:text-[#FF9100] cursor-pointer'>Service</li>
          </Link>

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
          className='lg:hidden text-2xl text-gray-700 z-50'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Spacer div */}
      <div className='h-[50px] lg:h-[98px]'></div>

      {/* Mobile Menu Overlay - Fixed Position */}
      {menuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className='fixed inset-0 bg-black/50 z-40 lg:hidden'
            onClick={closeMenu}
          />
          
          {/* Mobile Menu - Fixed and Scrollable */}
          <div className='fixed top-[70px] lg:top-[98px] left-0 right-0 bottom-0 bg-white z-40 lg:hidden overflow-y-auto'>
            <ul className='px-4 md:px-10 py-4 space-y-1 font-medium text-gray-700'>
              <li>
                <Link href='/' onClick={closeMenu} className='block py-2 hover:text-[#FF9100]'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/about-us' onClick={closeMenu} className='block py-2 hover:text-[#FF9100]'>
                  About Us
                </Link>
              </li>

              {/* Study Destination Dropdown - Mobile */}
              <li>
                <button
                  onClick={() => toggleDropdown('study')}
                  className='w-full text-left py-2 hover:text-[#FF9100] flex justify-between items-center'
                >
                  Study Destination
                  <span className={`transform transition-transform ${dropdownOpen === 'study' ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {dropdownOpen === 'study' && (
                  <div className='pl-4 mt-2 space-y-2 border-l-2 border-[#FF9100] ml-2'>
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
                      <Link href={country.url} key={country.name} onClick={closeMenu}>
                        <li className='py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer px-2 rounded'>
                          <img
                            src={`https://flagcdn.com/w40/${country.flag}.png`}
                            alt={country.name}
                            className='w-6 h-5 object-cover rounded-sm'
                          />
                          {country.name}
                        </li>
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <Link href='/service' onClick={closeMenu} className='block py-2 hover:text-[#FF9100]'>
                  Service
                </Link>
              </li>

              {/* Gallery Dropdown - Mobile */}
              <li>
                <button
                  onClick={() => toggleDropdown('gallery')}
                  className='w-full text-left py-2 hover:text-[#FF9100] flex justify-between items-center'
                >
                  Gallery
                  <span className={`transform transition-transform ${dropdownOpen === 'gallery' ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {dropdownOpen === 'gallery' && (
                  <div className='pl-4 mt-2 space-y-2 border-l-2 border-[#FF9100] ml-2'>
                    <Link href='/photo-gallery' onClick={closeMenu}>
                      <li className='py-2 hover:bg-gray-50 px-2 rounded cursor-pointer'>
                        Photo Gallery
                      </li>
                    </Link>
                    <Link href='/video-gallery' onClick={closeMenu}>
                      <li className='py-2 hover:bg-gray-50 px-2 rounded cursor-pointer'>
                        Video Gallery
                      </li>
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <Link href='/blogs' onClick={closeMenu} className='block py-2 hover:text-[#FF9100]'>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href='/contact-us' onClick={closeMenu} className='block py-2 hover:text-[#FF9100]'>
                  Contact Us
                </Link>
              </li>
              
              {/* Enquiry Button in Mobile Menu */}
              <li className='pt-4'>
                <button
                  onClick={() => {
                    setModalOpen(true)
                    closeMenu()
                  }}
                  className='w-full flex items-center justify-center gap-2 bg-[#ff9100] text-white font-semibold px-5 py-3 rounded-lg transition cursor-pointer'
                >
                  Enquire Now <FaLocationArrow />
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Modal Form - Updated with new fields */}
      {modalOpen && (
        <div className='fixed inset-0 bg-black/60 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6 relative max-h-[90vh] overflow-y-auto'>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className='absolute top-3 right-3 text-gray-600 hover:text-black text-xl cursor-pointer'
            >
              <FiX />
            </button>

            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
              Enquire Now
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Name - Optional */}
              <div>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Full Name'
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
                />
              </div>

              {/* Country - Optional */}
              <div>
                <select
                  name='country'
                  value={formData.country}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
                >
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
              </div>

              {/* Program - Optional with UG, PG, PhD, Diploma options */}
              <div>
                <select
                  name='program'
                  value={formData.program}
                  onChange={handleInputChange}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
                >
                  <option value=''>Select Program</option>
                  <option value='UG'>Undergraduate (UG)</option>
                  <option value='PG'>Postgraduate (PG)</option>
                  <option value='PhD'>PhD</option>
                  <option value='Diploma'>Diploma</option>
                </select>
              </div>

              {/* Subject - Optional */}
              <div>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder='Subject of Interest'
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
                />
              </div>

              {/* Mobile - Required */}
              <div>
                <input
                  type='tel'
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder='Mobile Number'
                  className={`w-full border ${formErrors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none`}
                />
                {formErrors.mobile && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.mobile}</p>
                )}
              </div>

              <button
                type='submit'
                disabled={loading}
                className={`w-full bg-[#FF9100] text-white font-semibold text-center justify-center items-center gap-x-1.5 inline-flex py-2 rounded-lg transition cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e68200]'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Enquiry <FaLocationArrow />
                  </>
                )}
              </button>
            </form>

            <p className='text-xs text-gray-500 mt-4 text-center'>
              By submitting, you agree to our privacy policy.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}