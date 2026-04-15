import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function MissionVision() {
  return (
    <div className='mt-[15vh] bg-white'>
      <div className='xl:max-w-7xl mx-auto px-4 md:px-10 xl:px-0 py-20 space-y-24'>

        {/* --- Mission Section --- */}
        <div className='flex flex-col md:flex-row items-center gap-12'>
          <div className='w-full md:w-1/2'>
            <img
              src="/mision.png"
              alt="Mission Target"
              className="rounded-3xl w-full max-h-[320px] object-contain"
            />
          </div>

          <div className='w-full md:w-1/2'>
            <div className="w-12 h-1 bg-[#ff9100] mb-4"></div>
            <h3 className='text-4xl font-bold text-gray-900 mb-6'>
              Our <span className='text-[#ff9100]'>Mission</span>
            </h3>
            <p className='text-gray-600 leading-relaxed mb-8'>
              Our mission is to guide students toward the best global education opportunities while supporting them throughout their journey. We are committed to creating a personalized roadmap to success based on each client's unique strengths, interests, and aspirations.
            </p>
          </div>
        </div>

        {/* --- Vision Section --- */}
        <div className='flex flex-col-reverse md:flex-row items-center gap-12'>
          <div className='w-full md:w-1/2'>
            <div className="w-12 h-1 bg-[#ff9100] mb-4"></div>
            <h3 className='text-4xl font-bold text-gray-900 mb-6'>
              Our <span className='text-[#ff9100]'>Vision</span>
            </h3>
            <p className='text-gray-600 leading-relaxed mb-8'>
              Our vision is to be one of the most trusted student consultancy firms in Bangladesh, recognized for exceptional expertise, innovative solutions, and an unwavering commitment to client success.
            </p>
          </div>

          <div className='w-full md:w-1/2'>
            <img
              src="/vision.png"
              alt="Vision Lightbulb"
              className="rounded-3xl w-full max-h-[320px] object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}