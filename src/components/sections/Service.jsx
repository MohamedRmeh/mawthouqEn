import React from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";

const Service = () => {
  return (
    <section
      className="
    mt-28 w-full overflow-hidden
    bg-white    
    bg-[url('https://www.brandpush.co/assets/img/theme/bg-1.svg')] 
    bg-cover 
    bg-center 
    bg-no-repeat
    "
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 p-8 py-14 lg:p-16">
        {/* Text Content */}
        <div data-aos="fade-right" className="w-full lg:w-[60%] space-y-7">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#21275c] leading-tight">
            Press Release Services & Software for in-house PR teams
          </h1>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
            Maintain all company announcements in one place so they are
            accessible to the media. Provide the media with all the information
            they need to write about you.
          </p>
          <ul className="space-y-3 text-slate-600 text-base lg:text-lg">
            <li className="flex items-start gap-2">
              <FaCheck className="text-green-600 mt-1" />
              <span>Build and save media lists</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheck className="text-green-600 mt-1" />
              <span>Pitch journalists directly through the platform</span>
            </li>
          </ul>

          <button className="bg-gradient-to-b from-[#0056f0] to-[#0040c0] text-white px-5 sm:px-15 py-3 rounded-lg font-semibold text-base sm:text-lg uppercase shadow-md hover:brightness-110 transition-all duration-300 tracking-[0.5px]">
            Do more with Newswire
          </button>
        </div>

        {/* Image */}
        <div
          data-aos="fade-left"
          className="w-full lg:w-[40%] flex justify-center lg:justify-end"
        >
          <Image
            src="https://lirp.cdn-website.com/fbdae4c0/dms3rep/multi/opt/for-pr-agencies-596h.png"
            width={420}
            height={320}
            alt="PR Services"
            className="rounded-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Service;
