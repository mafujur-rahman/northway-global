// app/components/VideoGalleryCmp.jsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaVideo, FaYoutube } from 'react-icons/fa';

export default function VideoGalleryCmp() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const getAuthToken = () => localStorage.getItem('auth_token');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        const response = await axios.get(
          'https://nortway.mrshakil.com/api/gallery/videos/',
          { headers: { 'Authorization': `Token ${token}` } }
        );

        console.log('Video Gallery API Response:', response.data);

        if (response.data.success) {
          setVideos(response.data.data);
          setTotalCount(response.data.count);
        } else if (response.data.data) {
          setVideos(response.data.data);
          setTotalCount(response.data.count || response.data.data.length);
        } else {
          setVideos([]);
          setTotalCount(0);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube URL conversion
    let videoId = null;

    // Check for youtube.com/watch?v= format
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }
    // Check for youtu.be/ format
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    // Check for youtube.com/embed/ format
    else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    }
    // Check for Vimeo URL
    else if (url.includes('vimeo.com')) {
      // For Vimeo, return the URL as is or convert to embed format
      if (url.includes('player.vimeo.com')) {
        return url;
      }
      const vimeoId = url.split('vimeo.com/')[1].split('?')[0];
      return `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&badge=0&controls=1&dnt=1`;
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1`;
    }

    // If it's already an embed URL, return it
    if (url.includes('/embed/')) {
      return url;
    }

    return url;
  };

  // if showAll = true → show all videos, otherwise show only 6
  const visibleVideos = showAll ? videos : videos.slice(0, 6);

  if (loading) {
    return (
      <div className='section__spacing'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Video Gallery</h2>
          <p className='text-gray-600'>Watch our collection of informative videos</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className='overflow-hidden rounded-lg animate-pulse'>
              <div className='w-full h-[30vh] xl:h-[35vh] bg-gray-200 rounded-lg'></div>
              <div className='mt-3 h-5 bg-gray-200 rounded w-3/4 mx-auto'></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='section__spacing'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Video Gallery</h2>
          <p className='text-gray-600'>Watch our collection of informative videos</p>
        </div>
        <div className='text-center text-red-600 p-8 bg-white rounded-lg'>
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

      {videos.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-lg'>
          <div className='text-gray-400 text-6xl mb-4'>🎥</div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Videos Yet</h3>
          <p className='text-gray-500'>Check back soon for new videos!</p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {visibleVideos.map((video) => {
              const embedUrl = getEmbedUrl(video.video_url);
              const isYouTube = embedUrl?.includes('youtube.com');

              return (
                <div key={video.id} className='group'>
                  <div className='overflow-hidden rounded-lg bg-black relative'>
                    {embedUrl ? (
                      <iframe
                        className='w-full h-[30vh] xl:h-[35vh] rounded-lg'
                        src={embedUrl}
                        frameBorder='0'
                        allow='autoplay; fullscreen; picture-in-picture; accelerometer; clipboard-write; encrypted-media; gyroscope'
                        allowFullScreen
                        title={video.title}
                      ></iframe>
                    ) : (
                      <div className='w-full h-[30vh] xl:h-[35vh] bg-gray-100 flex items-center justify-center'>
                        <FaYoutube className='text-5xl text-gray-300' />
                      </div>
                    )}
                  </div>
                  <div className='mt-3 text-center'>
                    <h3 className='font-medium text-gray-800 line-clamp-1'>{video.title}</h3>
                    {video.video_url && (
                      <a
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-xs text-[#ff9100] hover:underline'
                      >
                        Watch on {isYouTube ? 'YouTube' : 'Vimeo'}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More / Show Less Button */}
          {videos.length > 6 && (
            <div className='text-center mt-12'>
              <button
                onClick={() => setShowAll(!showAll)}
                className='px-8 py-3 rounded-lg bg-[#ff9100] text-white hover:bg-[#e68200] transition-colors duration-300 font-medium'
              >
                {showAll ? 'Show Less' : `Show More (${videos.length - 6} more)`}
              </button>
            </div>
          )}

        </>
      )}
    </div>
  );
}