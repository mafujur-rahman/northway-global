import React from 'react'



export default function AtAGlance ({ colorText = 'Usa' , glanceData }) {
  return (
    <div className='section__spacing '>
      <h2 className='headingText text-center'>
        {' '}
        <span className='heading__color__text '>{colorText}</span> At a Glance
      </h2>
      <div className='bg-[#FFF9F3] rounded-lg p-5 lg:p-10 mt-10 '>
        <div className='grid grid-cols-6 border-b-[1px] border-black/10 pb-3 gap-5 '>
          <p className='col-span-2 text-lg font-medium text-red-500'>Factors</p>
          <p className='col-span-4 text-lg font-medium text-red-500'>{colorText}</p>
        </div>
        {glanceData.map(item => (
          <div
            key={item.id}
            className='grid grid-cols-6  items-center border-b-[1px] gap-5 border-black/10 pb-5 py-3'
          >
            <h4 className='font-semibold text-lg text-gray-800 mb-2 col-span-2'>
              {item.factor}
            </h4>
            <ul className='list-none  text-gray-600 space-y-1 col-span-4 '>
              {item.value.map((val, index) => (
                <li key={index}>{val}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
