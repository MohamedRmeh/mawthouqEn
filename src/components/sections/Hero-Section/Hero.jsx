import React from "react";
import { Link } from "@/i18n/navigation";
import { FaTrophy, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useLocale } from "next-intl";
import LazyVideo from "./LazyVideo";

const Hero = ({ texts }) => {
  const t = texts;
  const lang = useLocale() === "en";

  return (
    <div
      className="
        relative 
        z-40
        px-5 sm:px-10 md:px-20 2xl:px-26
        py-6 lg:py-12 
        overflow-hidden 
        bg-[#f5f7fa]  
        lg:bg-white
      "
    >
      {/* Image as background */}
      <img
        src="https://www.brandpush.co/assets/img/theme/bg-1.svg"
        alt="Background Image"
        className={`absolute inset-0 w-full h-full object-cover transform ${
          lang ? "" : "scale-x-[-1]"
        }`}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
        {/* Left side - Text & Buttons */}
        <div
          data-aos={lang ? "fade-right" : "fade-left"}
          className={`flex-1 text-center ${
            lang ? "lg:text-left" : "lg:text-right"
          }`}
        >
          <h1 className="text-sm sm:text-base md:text-xl font-bold text-[#a0a0a0] uppercase leading-snug">
            {t?.topTitle}
          </h1>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold -tracking-[1px]">
            {t?.mainTitle}
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#575757] font-bold whitespace-nowrap mt-3">
            {t?.subTitle}
          </p>
          <p
            className="text-base sm:text-lg md:text-xl text-[#475569] mt-5 sm:mt-6 md:mt-7 max-w-2xl font-[450] leading-relaxed tracking-wide mx-auto lg:mx-0"
            dangerouslySetInnerHTML={{ __html: t?.description }}
          />

          {/* Buttons */}
          <div className="mt-6 sm:mt-7 flex justify-center lg:justify-start gap-2 sm:gap-4 whitespace-nowrap">
            <Link
              href="/marketplace"
              className="bg-gradient-to-b from-[#0056f0] to-[#0040c0] text-white px-5 sm:px-15 py-3 rounded-full font-semibold text-base sm:text-lg uppercase shadow-md hover:brightness-110 transition-all duration-300 tracking-[0.5px] sm:tracking-[1px]"
            >
              {t?.getStarted}
            </Link>

            <Link
              href="/about"
              className="border border-slate-400 text-black px-5 sm:px-15 hover:bg-slate-200 py-3 rounded-full font-semibold transition text-base sm:text-lg uppercase tracking-[0.5px] sm:tracking-[1px]"
            >
              {t?.learnMore}
            </Link>
          </div>

          {/* Rating section */}
          <div className="mt-6 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-medium mt-5">
              <FaTrophy className="text-yellow-500 text-xl" />
              <p
                className="text-[#737373]"
                dangerouslySetInnerHTML={{ __html: t?.ratingText }}
              />
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

        {/* Right side - Image & Video */}
        <div
          data-aos={lang ? "fade-left" : "fade-right"}
          className="flex justify-end h-full"
        >
          <img
            src="/images/hero.jpg"
            alt="Hero Small"
            className="block lg:hidden max-h-[524px] object-cover rounded-xl shadow-xl"
          />
          <LazyVideo />
        </div>
      </div>
    </div>
  );
};

export default Hero;
