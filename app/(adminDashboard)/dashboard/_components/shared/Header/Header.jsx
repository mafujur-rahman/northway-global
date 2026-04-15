import Image from 'next/image'
import React from 'react'
import logo from '../../../../dashboard/public/logo.webp'
import Buttons from '../../Home/Buttons/Buttons'

export default function Header () {
  return (
    <nav className='nav__container'>
      <div>
        <Image
          className='logo'
          src={logo}
          width={1000}
          height={1000}
          alt='logo'
        ></Image>
      </div>

      {/* btn */}
      <div>
        <Buttons />
      </div>
    </nav>
  )
}
