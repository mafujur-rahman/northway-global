// app/components/PhotoGalleryCmp.jsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaImages, FaSpinner, FaTimes, FaSearchPlus } from 'react-icons/fa';

export default function PhotoGalleryCmp() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const getAuthToken = () => localStorage.getItem('auth_token');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getAuthToken();
        const response = await axios.get(
          'https://api.northwayglobal.com.bd/api/gallery/photos/',
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

  const visibleImages = showAll ? images : images.slice(0, 9);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedImage]);

  if (loading) {
    return (
      <div className='section__spacing'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Photo Gallery</h2>
          <p className='text-gray-600'>Explore our collection of memorable moments</p>
        </div>
        <div className='columns-1 sm:columns-2 lg:columns-5 gap-4 space-y-4'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className='break-inside-avoid mb-4 animate-pulse'>
              <div className='w-full bg-gray-200 rounded-lg' style={{ height: `${150 + Math.random() * 100}px` }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='section__spacing'>
        <div className='text-center text-red-600 p-8 rounded-lg'>
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
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Photo Gallery</h2>
        <p className='text-gray-600'>Explore our collection of memorable moments</p>
        {totalCount > 0 && (
          <p className='text-sm text-gray-500 mt-2'>{totalCount} beautiful memories</p>
        )}
      </div>

      {images.length === 0 ? (
        <div className='text-center py-12 rounded-lg'>
          <div className='text-gray-400 text-6xl mb-4'>📷</div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Images Yet</h3>
          <p className='text-gray-500'>Check back soon for new photos!</p>
        </div>
      ) : (
        <>
          {/* Masonry Grid Layout */}
          <div className='columns-1 sm:columns-2 lg:columns-5 gap-4 space-y-4'>
            {visibleImages.map((image) => (
              <div 
                key={image.id} 
                className='break-inside-avoid mb-4 relative rounded-lg overflow-hidden cursor-pointer group bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300'
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.photo}
                  alt={image.title || `Gallery ${image.id}`}
                  className='w-full h-auto transition-transform duration-500 group-hover:scale-105'
                  loading="lazy"
                />
                
                {/* Overlay with title */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center'>
                  <div className='pb-4 px-3 w-full text-center transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2'>
                    <p className='text-white text-sm font-semibold line-clamp-2'>
                      {image.title || `Image ${image.id}`}
                    </p>
                  </div>
                </div>

                {/* Quick view icon */}
                <div className='absolute top-2 right-2 bg-black/60 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'>
                  <FaSearchPlus className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {images.length > 9 && (
            <div className='text-center mt-12'>
              <button
                onClick={() => setShowAll(!showAll)}
                className='px-8 py-3 rounded-lg bg-[#ff9100] text-white hover:bg-[#e68200] transition-colors duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all'
              >
                {showAll ? 'Show Less' : `Show More (${images.length - 9} more)`}
              </button>
            </div>
          )}

          {/* Full Screen Modal */}
          {selectedImage && (
            <div 
              className='fixed inset-0 z-[9999] flex items-center justify-center'
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh'
              }}
              onClick={() => setSelectedImage(null)}
            >
              <div 
                className='relative max-w-[90vw] max-h-[90vh] flex items-center justify-center'
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.photo}
                  alt={selectedImage.title}
                  className='max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl'
                  style={{ display: 'block' }}
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className='absolute -top-12 right-0 text-white hover:text-[#ff9100] transition-colors text-3xl font-bold bg-black/50 rounded-full p-2 w-10 h-10 flex items-center justify-center'
                  style={{ right: '-20px', top: '-50px' }}
                >
                  <FaTimes />
                </button>

                {/* Title */}
                {selectedImage.title && (
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg'>
                    <p className='text-white text-center text-lg font-semibold'>
                      {selectedImage.title}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}