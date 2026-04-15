import './globals.css'
import Footer from './_components/shared/Footer/Footer'
import Navbar from './_components/shared/Footer/Navbar/Navbar'
import localFont from 'next/font/local'
import { IoLogoWhatsapp } from 'react-icons/io'
import { FaWhatsapp } from 'react-icons/fa'

const helvetica = localFont({
  src: './public/Helvetica.woff2'
})

export const metadata = {
  title: 'Northway - Home',
  description:
    'Northway is a student scholarship company dedicated to helping learners access educational opportunities, financial aid, and career growth through trusted scholarship programs.'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-arp=''>
      <body
        cz-shortcut-listen='true'
        className={`${helvetica.className}  bg-[#EAEAEA]  antialiased relative`}
      >
        <Navbar />
        {children}
        <Footer />
        <div className='fixed bottom-16 right-5 xl:right-6 z-[999]'>
          <a
            href='https://wa.me/8801771660030'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg  overflow-hidden border border-black/10'>
              <FaWhatsapp className='text-[40px] text-[#25D366] cursor-pointer' />
            </div>
          </a>
        </div>
      </body>
    </html>
  )
}
