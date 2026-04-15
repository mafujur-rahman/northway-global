import Link from 'next/link'
import React from 'react'

export default function BaseBtn ({ link = '/', text, className, icon: Icon }) {
  return (
    <button
      className={`border-[#FF9100] border rounded-md text-[#FF9100] hover:bg-[#ff9100] hover:text-white transition-all ease-in-out duration-300 font-medium text-shadow-2xs  py-2 px-4 ${className}`}
    >
      <Link href={link}>
        <div className='flex items-center gap-x-2'>
          <span className='text-base font-semibold'>{text}</span>
          {Icon && <Icon className='text-xl  font-black' />}
        </div>
      </Link>
    </button>
  )
}
