// app/components/ContactForm.jsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import BaseBtn from '../utlities/CommonBtn/BaseBtn';
import { MdArrowOutward } from 'react-icons/md';
import SectionHeading from '../utlities/SectionHeading/SectionHeading';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailUnreadSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

export default function ContactForm() {
  const offices = [
    {
      id: 1,
      name: "Bangladesh",
      flag: "https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/flags/bangladesh.webp",
      email: "infonorthwaybd@gmail.com",
      phone: "+880 1607-002687",
      address: "Kha-12/2, Shahjaspur, Gulshan, Dhaka-1212"
    },
    {
      id: 2,
      name: "USA",
      flag: "https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/flags/America.webp",
      email: "infonorthwaybd@gmail.com",
      phone: "+1 202-555-0188",
      address: "1234 Broadway, New York, USA"
    },
    {
      id: 3,
      name: "Australia",
      flag: "https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/flags/au.jpg",
      email: "infonorthwaybd@gmail.com",
      phone: "+61 2 5550 1234",
      address: "56 King Street, Sydney, Australia"
    }
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: 'Bangladesh',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle office selection
  const handleOfficeSelect = (office) => {
    setSelectedOffice(office);
    setFormData(prev => ({ ...prev, country: office.name }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Using Contact Us API endpoint
      const response = await axios.post(
        'https://nortway.mrshakil.com/api/contact/contact-us/',
        {
          name: formData.name,
          email: formData.email,
          country: formData.country,
          message: formData.message
        }
      );
      
      console.log('API Response:', response.data);
      
      if (response.data.success || response.data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: response.data.message || 'Thank you for contacting us. We will get back to you soon.',
          confirmButtonColor: '#ff9100',
          timer: 3000,
          timerProgressBar: true
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          country: selectedOffice.name,
          message: ''
        });
        setErrors({});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.message || 'Failed to send message. Please try again.',
          confirmButtonColor: '#ff9100'
        });
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to send message. Please try again later.',
        confirmButtonColor: '#ff9100'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Offices List */}
      <div className='text-center'>
        <h3 className='headingText'>
          Our <span className='heading__color__text'>Offices</span>
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-10'>
          {offices.map((office) => (
            <div
              key={office.id}
              onClick={() => handleOfficeSelect(office)}
              className={`flex justify-center items-center gap-3 p-5 lg:p-10 cursor-pointer transition ${
                selectedOffice.id === office.id ? "border-2 border-[#ff9100] rounded-lg" : "border border-black/10 rounded-lg hover:border-[#ff9100]"
              }`}
            >
              <Image
                src={office.flag}
                alt={office.name}
                width={1200}
                height={600}
                className='h-8 w-10 rounded object-cover'
              />
              <h3 className='cf__textTitle'>{office.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* form + contact info */}
      <div className='mt-[8vh] grid lg:grid-cols-12 gap-10 xl:gap-20 items-center'>
        {/* Contact Form */}
        <div className='lg:col-span-8 order-2 md:order-1'>
          <form onSubmit={handleSubmit} className='bg-white p-5 lg:p-10 rounded-lg space-y-5'>
            <div>
              <label className='cf__label'>Name <span className='text-red-500'>*</span></label>
              <input 
                type='text' 
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Type Your Name' 
                className={`cf__input ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
            </div>

            <div>
              <label className='cf__label'>Email <span className='text-red-500'>*</span></label>
              <input 
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`cf__input ${errors.email ? 'border-red-500' : ''}`}
                placeholder='Type Your Email'
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
            </div>

            <div>
              <label className='cf__label'>Country <span className='text-red-500'>*</span></label>
              <input
                className={`cf__input ${errors.country ? 'border-red-500' : ''}`}
                type='text'
                name='country'
                value={formData.country}
                onChange={handleChange}
                placeholder='Your Country'
              />
              {errors.country && <p className='text-red-500 text-xs mt-1'>{errors.country}</p>}
            </div>

            <div>
              <label className='cf__label'>Message <span className='text-red-500'>*</span></label>
              <textarea 
                className={`cf__input ${errors.message ? 'border-red-500' : ''}`}
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows={5} 
                placeholder='Type Your Message'
              />
              {errors.message && <p className='text-red-500 text-xs mt-1'>{errors.message}</p>}
            </div>

            <BaseBtn 
              text={loading ? 'Sending...' : 'Submit'} 
              icon={MdArrowOutward}
              disabled={loading}
            />
          </form>
        </div>

        {/* Dynamic contact info */}
        <div className='lg:col-span-4 order-1 md:order-2'>
          <SectionHeading
            classNameBtn='!justify-start'
            text='Contact'
            Icon={IoMailUnreadSharp}
            title='Contact '
            colorTitle='Us'
            subtitle={`Get in touch with our ${selectedOffice.name} office.`}
            className='!text-left'
          />

          <div className='cf__socaiParent'>
            <div className='cf__socailDiv'>
              <IoMailUnreadSharp className='text-sm md:text-base lg:text-xl' />
            </div>
            <div>
              <h2 className='heading__sub__text__contact__title'>Email</h2>
              <p className='text__base'>{selectedOffice.email}</p>
            </div>
          </div>

          <div className='cf__socaiParent'>
            <div className='cf__socailDiv'>
              <FaPhone className='text-sm md:text-base lg:text-xl' />
            </div>
            <div>
              <h2 className='heading__sub__text__contact__title'>Phone</h2>
              <p className='text__base'>{selectedOffice.phone}</p>
            </div>
          </div>

          <div className='cf__socaiParent'>
            <div className='cf__socailDiv'>
              <FaLocationDot className='text-sm md:text-base lg:text-xl' />
            </div>
            <div>
              <h2 className='heading__sub__text__contact__title'>Address</h2>
              <p className='text__base'>{selectedOffice.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}