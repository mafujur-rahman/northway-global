'use client'
import React from 'react'

export default function CommonBtn ({ icon: Icon, text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 bg-[#ff9100] text-white rounded-full text-sm text-shadow cursor-pointer  ${className}`}
    >
      {Icon && <Icon className='text-xl'></Icon>}
      {text}
    </button>
  )
}
