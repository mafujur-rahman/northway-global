'use client'
import React from 'react'
import CommonBtn from '../../utilities/CommonBtn'
import { IoKey } from 'react-icons/io5'
import { RiLogoutBoxRLine } from 'react-icons/ri'

export default function Buttons () {
  const handlePasswordChange = () => {
    alert('password is changed')
  }

  return (
    <div className='flex items-center gap-x-5'>
      <CommonBtn
        text='Change Password'
        icon={IoKey}
        className='bg-gray-200 !text-black/80'
        onClick={handlePasswordChange}
      />
      <CommonBtn
        text='Log Out'
        className='bg-gray-200 !text-black/80'
        icon={RiLogoutBoxRLine}
        onClick={handlePasswordChange}
      />
    </div>
  )
}
