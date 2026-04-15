import React from 'react'

export default function Banner ({ url, text, des , colorText }) {
  return (
    <div
      className='bg-cover bg-right xl:bg-top bg-no-repeat h-[40vh] md:h-[40vh] lg:h-[60vh]  text-white text-left flex items-center px-4 md:px-10 xl:px-20'
      style={{ backgroundImage: `url(${url})` }}
    >
      <div>
        <h2 className='banner__title'> <span className='banner__color__title'>{colorText}</span> {text}</h2>
        {des && <p className='mt-4 max-w-2xl text-black text-lg line-clamp-2 lg:line-clamp-none'>{des}</p>}
      </div>
    </div>
  )
}
