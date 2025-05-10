import React from "react";
import Link from "next/link";
import { FaTrophy, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <div
      className="
    relative 
    px-5 sm:px-10 md:px-20 2xl:px-26
    py-6 lg:py-12 
    overflow-hidden 
    bg-[#f5f7fa]   // لون الخلفية في الشاشات الصغيرة
    lg:bg-white    // خلفية بيضاء للشاشات الكبيرة في حال فشل تحميل الصورة مثلاً
    lg:bg-[url('https://www.brandpush.co/assets/img/theme/bg-1.svg')] 
    lg:bg-cover 
    lg:bg-center 
    lg:bg-no-repeat
  "
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
        {/* Left side - Text & Buttons */}
        <div data-aos="fade-right" className="flex-1 text-center lg:text-left">
          <h1 className="text-sm sm:text-base md:text-xl font-bold text-[#a0a0a0] uppercase leading-snug">
            Guaranteed Publicity On
          </h1>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold -tracking-[1px]">
            200 News Sites
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#575757] font-bold whitespace-nowrap">
            Build Trust & Credibility With Ease
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#475569] mt-5 sm:mt-6 md:mt-7 max-w-2xl font-[450] leading-relaxed tracking-wide mx-auto lg:mx-0">
            Publish your story on influential news sites that your competitors
            can't reach. With <strong>millions of readers</strong> every month,
            you'll get a massive boost in exposure, interest,
            <br className="hidden sm:block" /> and credibility.
          </p>

          {/* Buttons */}
          <div className="mt-6 sm:mt-7 flex justify-center lg:justify-start gap-2 sm:gap-4 whitespace-nowrap">
            <Link
              href="/"
              className="bg-gradient-to-b from-[#0056f0] to-[#0040c0] text-white px-5 sm:px-15 py-3 rounded-full font-semibold text-base sm:text-lg uppercase shadow-md hover:brightness-110 transition-all duration-300 tracking-[0.5px] sm:tracking-[1px]"
            >
              Get Started
            </Link>

            <Link
              href="/"
              className="border border-slate-400 text-black px-5 sm:px-15 hover:bg-slate-200 py-3 rounded-full font-semibold transition text-base sm:text-lg uppercase tracking-[0.5px] sm:tracking-[1px]"
            >
              Learn More
            </Link>
          </div>

          {/* Rating section */}
          <div className="mt-6 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium mt-5">
              <FaTrophy className="text-yellow-500 text-xl" />
              <p className="text-[#737373]">
                Rated <strong>Excellent</strong> 4.7 from 250+ reviews
              </p>
            </div>
            <div className="flex gap-1 mt-3 text-yellow-400 text-lg sm:text-xl">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
          </div>
        </div>

        <div data-aos="fade-left" className="flex justify-end h-full">
          <img
            src="/images/hero.jpg"
            alt="Hero Small"
            className="block lg:hidden max-h-[524px] object-cover rounded-xl shadow-xl"
          />

          <video
            src="/images/heroY.mp4"
            className="hidden lg:block w-[424px] max-h-[524px] object-cover rounded-xl shadow-xl"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
