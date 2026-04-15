"use client";
import React from "react";

export default function PopularUniversities({ universities, countries }) {
  // Determine which data to show
  const isCountriesMode = countries && countries.length > 0;
  const items = isCountriesMode ? countries : universities;
  const titleText = isCountriesMode ? "Popular Countries" : "Popular Universities";

  // Duplicate for infinite loop effect
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className='relative h-auto w-full mt-[15vh] overflow-hidden'>
      {/* Background image */}
      <div className='absolute inset-0 bg-[url("https://pub-5955669eccb64965b91474a798f31ae3.r2.dev/usa/unibg-66db347170e15.webp")] bg-cover bg-center bg-no-repeat bg-fixed'></div>

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/50'></div>

      {/* Content */}
      <div className='relative max-w-5xl mx-auto text-center pt-[10vh]'>
        <h3 className='headingText !text-white'>
          {titleText.split(" ")[0]}{" "}
          <span className='banner__color__title'>{titleText.split(" ")[1]}</span>
        </h3>

        {/* Infinite Slider */}
        <div className='w-full overflow-hidden pb-[10vh] pt-[5vh]'>
          <div className='slider-track'>
            <div className='slider-content'>
              {duplicatedItems.map((item, index) => (
                <div
                  key={index}
                  className='flex-shrink-0 flex flex-col justify-center items-center text-center w-64 h-40 bg-white shadow-md rounded-lg overflow-hidden text-black mx-3'
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className='w-20 h-20 object-contain mb-3'
                  />
                  <p className='font-medium px-2'>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        .slider-track {
          overflow: hidden;
          width: 100%;
        }

        .slider-content {
          display: flex;
          animation: scrollRightToLeft 30s linear infinite;
          width: max-content;
        }

        @keyframes scrollRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .slider-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}