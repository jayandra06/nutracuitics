'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    title: 'Premium Nutraceutical Products',
    subtitle: 'Your health, our priority',
    description: 'Discover quality supplements and wellness products for a healthier lifestyle',
    cta: 'Shop Now',
    ctaLink: '/products',
    bgGradient: 'from-primary-600 to-primary-800',
    image: '💊',
  },
  {
    id: 2,
    title: 'Flash Sale - Up to 50% OFF',
    subtitle: 'Limited time offers',
    description: 'Save big on premium supplements. Grab amazing deals before they expire!',
    cta: 'View Deals',
    ctaLink: '/products',
    bgGradient: 'from-red-600 to-orange-600',
    image: '⚡',
  },
  {
    id: 3,
    title: 'Compare Prices Instantly',
    subtitle: 'Amazon vs Flipkart vs Us',
    description: 'Get the best prices on all products. Compare and save with every purchase!',
    cta: 'Start Comparing',
    ctaLink: '/products',
    bgGradient: 'from-purple-600 to-pink-600',
    image: '💰',
  },
  {
    id: 4,
    title: 'Free Shipping on Orders ₹500+',
    subtitle: 'Fast & Reliable Delivery',
    description: 'Quick delivery to your doorstep. Track your order in real-time!',
    cta: 'Shop Now',
    ctaLink: '/products',
    bgGradient: 'from-green-600 to-teal-600',
    image: '🚚',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slides */}
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div
              className={`h-full bg-gradient-to-r ${slide.bgGradient} text-white`}
            >
              <div className="container-custom h-full flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                  {/* Text Content */}
                  <div className="text-center md:text-left">
                    <p className="text-lg md:text-xl text-white/80 mb-2">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <Link
                        href={slide.ctaLink}
                        className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-lg"
                      >
                        {slide.cta}
                      </Link>
                      <Link
                        href="/about"
                        className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition text-lg"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>

                  {/* Icon/Image */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="text-[200px] animate-pulse">
                      {slide.image}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition z-10"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition z-10"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

