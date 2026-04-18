// app/components/PhotoGalleryCmp.jsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaImages, FaSpinner } from 'react-icons/fa';

export default function PhotoGalleryCmp() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const getAuthToken = () => localStorage.getItem('auth_token');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getAuthToken();
        const response = await axios.get(
          'https://nortway.mrshakil.com/api/gallery/photos/',
          
        );
        
        console.log('Gallery API Response:', response.data);
        
        if (response.data.success) {
          setImages(response.data.data);
          setTotalCount(response.data.count);
        } else if (response.data.data) {
          setImages(response.data.data);
          setTotalCount(response.data.count || response.data.data.length);
        } else {
          setImages([]);
          setTotalCount(0);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  // if showAll = true → show all images, otherwise show only 9
  const visibleImages = showAll ? images : images.slice(0, 9);

  if (loading) {
    return (
      <div className='section__spacing'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Photo Gallery</h2>
          <p className='text-gray-600'>Explore our collection of memorable moments</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className='overflow-hidden rounded-lg animate-pulse'>
              <div className='w-full h-[40vh] bg-gray-200 rounded-lg'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='section__spacing'>
        
        <div className='text-center text-red-600 p-8  rounded-lg'>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className='mt-4 px-6 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#e68200] transition'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='section__spacing'>


      {images.length === 0 ? (
        <div className='text-center py-12 rounded-lg'>
          <div className='text-gray-400 text-6xl mb-4'>📷</div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Images Yet</h3>
          <p className='text-gray-500'>Check back soon for new photos!</p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
            {visibleImages.map((image) => (
              <div 
                key={image.id} 
                className='overflow-hidden rounded-lg group  relative'
               
              >
                <img
                  src={image.photo}
                  alt={image.title || `Gallery ${image.id}`}
                  className='w-full h-[40vh] object-cover transition-transform duration-500 group-hover:scale-110'
                />
                {/* Overlay with title */}
                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                  <p className='text-white text-lg font-semibold text-center px-4'>
                    {image.title || `Image ${image.id}`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {images.length > 9 && (
            <div className='text-center mt-12'>
              <button
                onClick={() => setShowAll(!showAll)}
                className='px-8 py-3 rounded-lg bg-[#ff9100] text-white hover:bg-[#e68200] transition-colors duration-300 font-medium'
              >
                {showAll ? 'Show Less' : `Show More (${images.length - 9} more)`}
              </button>
            </div>
          )}

        </>
      )}
    </div>
  );
}