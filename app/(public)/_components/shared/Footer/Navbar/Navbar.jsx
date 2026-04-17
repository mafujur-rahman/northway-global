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
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

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

  const validateForm = () => {
    const errors = {}
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    }
    
    if (!formData.country) {
      errors.country = 'Please select a country'
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
      // Create a formatted message for email
      const emailBody = `
        New Enquiry from Northway Global Website
        
        Full Name: ${formData.fullName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Country: ${formData.country}
        Message: ${formData.message || 'No message provided'}
        
        Submitted from: Navbar Enquiry Form
        Date: ${new Date().toLocaleString()}
      `
      
      // Option 1: Use mailto (opens default email client)
      // This is the simplest solution that doesn't require a backend
      const mailtoLink = `mailto:info@northwayglobal.com?subject=New Enquiry from ${encodeURIComponent(formData.fullName)}&body=${encodeURIComponent(emailBody)}`
      
      // Open email client
      window.location.href = mailtoLink
      
      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your email client will open to send your enquiry.'
      })
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        message: ''
      })
      
      // Close modal after 3 seconds
      setTimeout(() => {
        setModalOpen(false)
        setSubmitStatus({ type: '', message: '' })
      }, 3000)
      
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit. Please contact us directly at info@northwayglobal.com'
      })
    } finally {
      setLoading(false)
    }
  }

  // Alternative: Submit to Google Forms (uncomment and use if preferred)
  // const handleSubmitGoogleForms = async (e) => {
  //   e.preventDefault()
  //   
  //   const errors = validateForm()
  //   if (Object.keys(errors).length > 0) {
  //     setFormErrors(errors)
  //     return
  //   }
  //   
  //   setLoading(true)
  //   
  //   try {
  //     // Replace with your Google Form action URL and entry IDs
  //     const formUrl = 'YOUR_GOOGLE_FORM_ACTION_URL'
  //     const formDataObj = new FormData()
  //     formDataObj.append('entry.123456789', formData.fullName)
  //     formDataObj.append('entry.987654321', formData.email)
  //     formDataObj.append('entry.555555555', formData.phone)
  //     formDataObj.append('entry.444444444', formData.country)
  //     formDataObj.append('entry.333333333', formData.message)
  //     
  //     await fetch(formUrl, {
  //       method: 'POST',
  //       mode: 'no-cors',
  //       body: formDataObj
  //     })
  //     
  //     setSubmitStatus({
  //       type: 'success',
  //       message: 'Thank you for your enquiry! We will get back to you soon.'
  //     })
  //     
  //     setFormData({
  //       fullName: '',
  //       email: '',
  //       phone: '',
  //       country: '',
  //       message: ''
  //     })
  //     
  //     setTimeout(() => {
  //       setModalOpen(false)
  //       setSubmitStatus({ type: '', message: '' })
  //     }, 2000)
  //   } catch (err) {
  //     setSubmitStatus({
  //       type: 'error',
  //       message: 'Failed to submit. Please try again.'
  //     })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const closeModal = () => {
    setModalOpen(false)
    setFormErrors({})
    setSubmitStatus({ type: '', message: '' })
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      message: ''
    })
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

      {/* Spacer div */}
      <div className='h-[50px] lg:h-[98px]'></div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className='lg:hidden bg-white shadow-lg px-6 py-4 space-y-2 font-medium text-gray-700 pb-16'>
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
              onClick={closeModal}
              className='absolute top-3 right-3 text-gray-600 hover:text-black text-xl cursor-pointer'
            >
              <FiX />
            </button>

            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
              Enquire Now
            </h2>
            
            {/* Status Message */}
            {submitStatus.message && (
              <div className={`mb-4 p-3 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-300' 
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <input
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder='Full Name *'
                  className={`w-full border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none`}
                />
                {formErrors.fullName && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.fullName}</p>
                )}
              </div>
              
              <div>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email Address *'
                  className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none`}
                />
                {formErrors.email && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='Phone Number *'
                  className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none`}
                />
                {formErrors.phone && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.phone}</p>
                )}
              </div>
              
              <div>
                <select
                  name='country'
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none`}
                >
                  <option value=''>Select Country *</option>
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
                {formErrors.country && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.country}</p>
                )}
              </div>
              
              <div>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Your Message (Optional)'
                  rows='3'
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF9100] outline-none'
                ></textarea>
              </div>

              <button
                type='submit'
                disabled={loading}
                className={`w-full bg-[#FF9100] text-white font-semibold text-center justify-center items-center gap-x-1.5 inline-flex py-2 rounded-lg transition cursor-pointer ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e68200]'
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
              * Required fields. By submitting, you agree to our privacy policy.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}