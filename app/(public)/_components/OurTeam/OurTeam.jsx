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
      title: 'Founder & Chairman',
      image: '',
      mail: 'mahbub.northwayglobal@gmail.com'
    },
    {
      id: 1,
      name: 'Abul Hayat',
      title: 'Chief Advisor',
      image: '/team/Abul hayat.jpeg',
      mail: ''
    },
    {
      id: 2,
      name: 'Md Qumruzzaman',
      title: 'Advisor',
      image: '/team/Qumruzzaman.jpeg',
      mail: ''
    },
    {
      id: 3,
      name: 'Md Mahmudul Hasan',
      title: 'Manager',
      image: '/team/Mahmudul Hasan.jpeg',
      mail: 'mahmud.northway@gmail.com'
    },
    {
      id: 4,
      name: 'Farzana Yeasmin',
      title: 'Student Relationship Officer',
      image: '/team/Farzana Yeasmin.jpeg',
      mail: 'farzana.northway@gmail.com'
    },
    {
      id: 5,
      name: 'Shamima Akter',
      title: 'Manager IR',
      image: '/team/Shamima Akter.jpeg',
      mail: 'shamimanorthway@gmail.com'
    },
    {
      id: 6,
      name: 'Mehedi Hasan',
      title: 'BDO',
      image: '/team/Mehedi Hasan.jpeg',
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

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8 my-16'>
        {teamMembers.map((member, index) => (
          <div key={`${member.id}-${index}`} className='group text-center'>

            {/* Image */}
            <div className='relative overflow-hidden rounded-xl'>
              <img
                src={member.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={member.name}
                className='w-full h-[35vh] object-cover bg-gray-50 rounded-xl transition duration-700 group-hover:scale-105'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                }}
              />

              {/* Hover Message Icon */}
              {member.mail && member.mail.trim() !== '' && (
                <div className='absolute top-3 right-3 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300'>
                  <button 
                    className='p-2 bg-white/90 backdrop-blur rounded-full text-gray-700 hover:bg-[#ff9100] hover:text-white transition shadow cursor-pointer'
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
              )}
            </div>

            {/* Name */}
            <h3 className='mt-4 text__medium'>{member.name}</h3>
            <p className='text-sm text-gray-500 mt-1'>{member.title}</p>
          </div>
        ))}
      </div>

      {/* Email Options Modal */}
      {showEmailOptions && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50' onClick={() => setShowEmailOptions(false)}>
          <div className='bg-white rounded-xl p-6 max-w-md mx-4' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-xl font-bold mb-2'>Send Email to {selectedName}</h3>
            <p className='text-gray-600 mb-4 break-all'>{selectedEmail}</p>
            
            <div className='space-y-2'>
              <button 
                onClick={openGmail}
                className='w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
              >
                Open Gmail
              </button>
              
              <button 
                onClick={openOutlook}
                className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
              >
                Open Outlook
              </button>
              
              <button 
                onClick={openDefaultMail}
                className='w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition'
              >
                Open Default Mail App
              </button>
              
              <button 
                onClick={copyEmail}
                className='w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition'
              >
                Copy Email Address
              </button>
              
              <button 
                onClick={() => setShowEmailOptions(false)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition'
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