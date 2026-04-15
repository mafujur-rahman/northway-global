'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import BaseBtn from '../utlities/CommonBtn/BaseBtn'
import { MdArrowOutward } from 'react-icons/md'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailUnreadSharp } from "react-icons/io5";

export default function ContactForm () {
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
  ]

  // Default: Bangladesh
  const [selectedOffice, setSelectedOffice] = useState(offices[0])

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
              onClick={() => setSelectedOffice(office)}
              className={`  flex justify-center items-center gap-3 p-5 lg:p-10 cursor-pointer transition ${
                selectedOffice.id === office.id ? "border border-[#ff9100] " : "border border-black/10"
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
          <form className=' bg-white p-5 lg:p-10 rounded-lg space-y-5'>
            <div>
              <label className='cf__label'>Name</label>
              <input type='text' placeholder='Type Your Name' className='cf__input' />
            </div>

            <div>
              <label className='cf__label'>Email</label>
              <input className='cf__input' type='text' placeholder='Type Your Email' />
            </div>

            <div>
              <label className='cf__label'>Country</label>
              <input
                className='cf__input'
                type='text'
                value={selectedOffice.name} // auto-fill
                readOnly
              />
            </div>

            <div>
              <label className='cf__label'>Message</label>
              <textarea className='cf__input' rows={5} placeholder='Type Your Message' />
            </div>

            <BaseBtn text='Submit' icon={MdArrowOutward}></BaseBtn>
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
  )
}
