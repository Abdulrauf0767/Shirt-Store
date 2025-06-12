import React, { useEffect, useState } from 'react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/6837891.jpg',
    '/images/7563734.jpg',
    '/images/7563831.jpg',
    '/images/9570743.jpg',
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [images.length]);

  const handleImages = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full mt-24 h-auto">
      <div
        className="
          w-[94%] 
          max-w-8xl 
          mx-auto 
          relative 
          overflow-hidden 
          rounded-lg 
          bg-gray-100
          aspect-[16/9] 
          md:aspect-[21/9] 
          min-h-[400px] 
          md:min-h-[400px]
        "
      >
        {images.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={item}
              alt={`slide-${index}`}
              className="w-full h-full object-cover select-none"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImages(index)}
              className={`rounded-full cursor-pointer transition-colors duration-300 md:w-5 md:h-5 w-3 h-3 ${
                currentIndex === index ? 'bg-green-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
