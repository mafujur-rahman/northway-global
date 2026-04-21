import React, { useState } from 'react'
import SectionHeading from '../utlities/SectionHeading/SectionHeading'
import { GiTeamIdea } from 'react-icons/gi'
import { HiOutlineMail } from 'react-icons/hi'

export default function OurTeam() {
  const [showEmailOptions, setShowEmailOptions] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState('')
  const [selectedName, setSelectedName] = useState('')

  const teamMembers = [
    {
      id: 1,
      name: 'Md. Mahbubur Rahman',
      title: 'Founder & CEO',
      image: '/team/ceo.png',
      mail: 'mahbub.northwayglobal@gmail.com'
    },
    {
      id: 2,
      name: 'Abul Hayat',
      title: 'Chief Advisor',
      image: '/team/abul-hayat.png',
      mail: ''
    },
    {
      id: 3,
      name: 'Md Qumruzzaman',
      title: 'Advisor',
      image: '/team/Qumruzzaman.jpeg',
      mail: ''
    },
    {
      id: 4,
      name: 'Shamima Akter',
      title: 'Manager IR',
      image: '/team/Shamima Akter.jpeg',
      mail: 'shamimanorthway@gmail.com'
    },
    {
      id: 5,
      name: 'Md Mahmudul Hasan',
      title: 'Manager (Student Relation)',
      image: '/team/mahmudul.png',
      mail: 'mahmud.northway@gmail.com'
    },
    {
      id: 6,
      name: 'Farzana Yeasmin',
      title: 'Student Relationship Officer',
      image: '/team/Farzana.jpeg',
      mail: 'farzana.northway@gmail.com'
    },
    
    {
      id: 7,
      name: 'Mehedi Hasan',
      title: 'BDO',
      image: '/team/Mehedi Hasan.jpeg',
      mail: 'mehedinorthway@gmail.com'
    },
    {
      id: 7,
      name: 'Mst Esrat Jahan',
      title: 'Counsellor',
      image: '/team/esrat.png',
      mail: 'mehedinorthway@gmail.com'
    },
  ]

  // Open Gmail compose
  const openGmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedEmail)}`, '_blank')
    setShowEmailOptions(false)
  }

  // Open Outlook.com
  const openOutlook = () => {
    window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(selectedEmail)}`, '_blank')
    setShowEmailOptions(false)
  }

  // Copy email to clipboard
  const copyEmail = () => {
    navigator.clipboard.writeText(selectedEmail)
    alert(`Email copied: ${selectedEmail}`)
    setShowEmailOptions(false)
  }

  // Try default mail client
  const openDefaultMail = () => {
    window.location.href = `mailto:${selectedEmail}`
    setShowEmailOptions(false)
  }

  const handleMailClick = (email, name) => {
    if (email && email.trim() !== '') {
      setSelectedEmail(email.trim())
      setSelectedName(name)
      setShowEmailOptions(true)
    }
  }

  return (
    <div className='section__spacing'>
      <SectionHeading
        text='Team'
        Icon={GiTeamIdea}
        title='Meet '
        colorTitle='Our Team'
        subtitle='Meet our amazing team members who bring everything together.'
      />

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8 my-16'>
        {teamMembers.map((member, index) => (
          <div key={`${member.id}-${index}`} className='group text-center'>
            
            {/* Passport Size Image Container - Fixed Aspect Ratio */}
            <div className='relative mx-auto w-full max-w-[280px]'>
              {/* 4:5 Aspect Ratio (Passport Size) - 1:1.25 ratio */}
              <div className='relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 shadow-md'>
                <img
                  src={member.image || 'https://via.placeholder.com/400x500?text=No+Image'}
                  alt={member.name}
                  className='absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105'
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x500?text=Image+Not+Found'
                  }}
                />

                {/* Mail Icon - Always visible on mobile/tablet, only on hover for large devices */}
                {member.mail && member.mail.trim() !== '' && (
                  <>
                    {/* For mobile and tablet (up to md breakpoint) - always visible */}
                    <div className='absolute top-1 right-1 z-10 md:hidden'>
                      <button 
                        className='p-1.5 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-[#ff9100] hover:text-white transition shadow cursor-pointer'
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleMailClick(member.mail, member.name)
                        }}
                        aria-label={`Send email to ${member.name}`}
                      >
                        <HiOutlineMail size={16} />
                      </button>
                    </div>
                    
                    {/* For large devices (md and above) - show on hover only */}
                    <div className='absolute top-3 right-3 opacity-0 scale-75 md:group-hover:opacity-100 md:group-hover:scale-100 transition duration-300 z-10 hidden md:block'>
                      <button 
                        className='p-2.5 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-[#ff9100] hover:text-white transition shadow cursor-pointer'
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleMailClick(member.mail, member.name)
                        }}
                        aria-label={`Send email to ${member.name}`}
                      >
                        <HiOutlineMail size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Name and Title */}
            <div className='mt-4 px-2'>
              <h3 className=' text-base sm:text-lg font-semibold line-clamp-2'>{member.name}</h3>
              <p className='text-xs sm:text-sm text-gray-500 mt-1.5 line-clamp-2'>{member.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Email Options Modal */}
      {showEmailOptions && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4' onClick={() => setShowEmailOptions(false)}>
          <div className='bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-xl font-bold mb-2'>Send Email to {selectedName}</h3>
            <p className='text-gray-600 mb-4 break-all text-sm'>{selectedEmail}</p>
            
            <div className='space-y-2'>
              <button 
                onClick={openGmail}
                className='w-full px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium'
              >
                Open Gmail
              </button>
              
              <button 
                onClick={openOutlook}
                className='w-full px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium'
              >
                Open Outlook
              </button>
              
              <button 
                onClick={openDefaultMail}
                className='w-full px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium'
              >
                Open Default Mail App
              </button>
              
              <button 
                onClick={copyEmail}
                className='w-full px-4 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium'
              >
                Copy Email Address
              </button>
              
              <button 
                onClick={() => setShowEmailOptions(false)}
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}