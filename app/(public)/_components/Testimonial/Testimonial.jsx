// app/testimonials/page.js (or wherever your testimonial page is)
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { GiNothingToSay } from 'react-icons/gi';
import Marquee from 'react-fast-marquee';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import SectionHeading from '../utlities/SectionHeading/SectionHeading';

// Reusable Card Component
const TestimonialCard = ({ item }) => (
  <div className='bg-white rounded-xl p-6 w-72 lg:w-80 xl:w-[400px] flex-shrink-0 mx-3 flex flex-col gap-4 shadow-sm border border-gray-100 hover:shadow-md transition'>
    {/* Header: Image and Author Info */}
    <div className='flex items-center gap-4'>
      {item.profile_image ? (
        <img
          src={item.profile_image}
          alt={item.name}
          className='w-16 h-16 rounded-full object-cover border-2 border-[#ff9100]'
        />
      ) : (
        <div className='w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-[#ff9100]'>
          <FaUserCircle className='text-4xl text-gray-400' />
        </div>
      )}
      <div className='flex flex-col'>
        <h4 className='text-[#2D4356] font-bold text-xl leading-tight'>
          {item.name}
        </h4>
        <p className='text-[#6B7C8E] text-sm font-medium'>
          {item.university}
        </p>
        {/* Star Rating */}
        <div className='flex items-center gap-0.5 mt-1'>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar 
              key={star} 
              className={`text-sm ${star <= item.star ? 'text-[#ff9100]' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>

    {/* Message Body */}
    <p className='text-[#2D4356] text-base leading-relaxed font-normal line-clamp-4'>
      "{item.comments}"
    </p>
    
    {/* Date */}
    {item.created_at && (
      <p className='text-xs text-gray-400 mt-2'>
        {new Date(item.created_at).toLocaleDateString()}
      </p>
    )}
  </div>
);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const getAuthToken = () => localStorage.getItem('auth_token');

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getAuthToken();
        const response = await axios.get(
          'https://nortway.mrshakil.com/api/testimonial/',
          { headers: { 'Authorization': `Token ${token}` } }
        );
        
        if (response.data.success) {
          setTestimonials(response.data.data);
          setTotalCount(response.data.count);
        } else {
          setTestimonials(response.data.data || []);
          setTotalCount(response.data.count || 0);
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className='section__spacing'>
        <div className='relative'>
          <SectionHeading
            text='Testimonials'
            Icon={GiNothingToSay}
            title='What’s Our '
            colorTitle='student say'
            subtitle='Our students have shared their incredible journeys and successes, from gaining admissions to top universities to receiving life-changing scholarships.'
          />
        </div>
        <div className='common__top__spacing tes__container relative'>
          <div className='flex justify-center items-center h-64'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9100] mx-auto'></div>
              <p className='mt-4 text-gray-600'>Loading testimonials...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='section__spacing'>
        <div className='relative'>
          <SectionHeading
            text='Testimonials'
            Icon={GiNothingToSay}
            title='What’s Our '
            colorTitle='student say'
            subtitle='Our students have shared their incredible journeys and successes, from gaining admissions to top universities to receiving life-changing scholarships.'
          />
        </div>
        <div className='common__top__spacing tes__container relative'>
          <div className='text-center text-red-600 p-8'>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className='mt-4 px-4 py-2 bg-[#ff9100] text-white rounded-lg'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='section__spacing'>
      <div className='relative'>
        <SectionHeading
          text='Testimonials'
          Icon={GiNothingToSay}
          title='What’s Our '
          colorTitle='student say'
          subtitle='Our students have shared their incredible journeys and successes, from gaining admissions to top universities to receiving life-changing scholarships.'
        />
      </div>

      <div className='common__top__spacing tes__container relative'>
        {testimonials.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📝</div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Testimonials Yet</h3>
            <p className='text-gray-500'>Be the first to share your experience!</p>
          </div>
        ) : (
          <>
            {/* Desktop View */}
            <div className='hidden lg:block'>
              <Marquee
                gradient={true}
                speed={40}
                pauseOnHover
                autoFill={true}
                gradientColor='#F3F4F6'
              >
                {testimonials.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </Marquee>
            </div>

            {/* Mobile and Tablet View */}
            <div className='lg:hidden block'>
              <Marquee speed={40} pauseOnHover autoFill={true}>
                {testimonials.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </Marquee>
            </div>
          </>
        )}
      </div>
    </div>
  );
}