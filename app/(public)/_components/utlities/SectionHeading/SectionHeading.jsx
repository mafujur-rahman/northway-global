'use client'
import React from 'react'

export default function SectionHeading ({
  title = '',
  colorTitle = '',
  subtitle = '',
  text = '', 
  Icon = null, 
  className = '', 
  classNameBtn = '' 
}) {
  return (
    <div className={`text-center ${className}`}>
      {/* Optional button with icon */}
      {text && (
        <div className={`flex justify-center mb-4 ${classNameBtn}`}>
          <button
            className={`flex items-center gap-x-2 bg-gray-100 rounded-full py-2 px-4 ${classNameBtn}`}
            data-tooltip={text}
          >
            {Icon && <Icon className='text-base text-[#FF9100]' />}
            <span className='text-sm font-semibold text-black/70'>{text}</span>
          </button>
        </div>
      )}

      {/* Heading */}
      <h2 className='headingText text-3xl md:text-4xl font-bold mb-2'>
        {title}{' '}
        {colorTitle && (
          <span className='heading__color__text '>
            {colorTitle}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className='heading__sub__text max-w-3xl mx-auto '>{subtitle}</p>
      )}
    </div>
  )
}
