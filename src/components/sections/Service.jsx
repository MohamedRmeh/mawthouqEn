"use client";
import React from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { useTranslations } from "next-intl";
import useLanguage from "../useLanguage";

const Service = () => {
  const t = useTranslations("Service");
  const lang = useLanguage() === "/en" ? true : false;
  return (
    <section
      className="
      relative
        mt-28 w-full overflow-hidden
        bg-white    
        bg-cover 
        bg-center 
        bg-no-repeat
      "
    >
      <img
        src="https://www.brandpush.co/assets/img/theme/bg-1.svg"
        alt="Background Image"
        className={`absolute inset-0 w-full h-full object-cover transform ${
          lang ? "" : "scale-x-[-1]"
        }`}
      />
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 p-8 py-14 lg:px-26">
        {/* Text Content */}
        <div
          data-aos={lang ? "fade-right" : "fade-left"}
          className="w-full lg:w-[60%] space-y-7"
        >
          <h1 className="text-3xl lg:text-5xl font-bold text-[#21275c] leading-tight">
            {t("title")}
          </h1>
          <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
            {t("description")}
          </p>
          <ul className="space-y-3 text-slate-600 text-base lg:text-lg">
            {t.raw("features").map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheck className="text-green-600 mt-1" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button className="bg-gradient-to-b from-[#0056f0] to-[#0040c0] text-white px-5 sm:px-15 py-3 rounded-lg font-semibold text-base sm:text-lg uppercase shadow-md hover:brightness-110 transition-all duration-300 tracking-[0.5px]">
            {t("button")}
          </button>
        </div>

        {/* Image */}
        <div
          data-aos={lang ? "fade-left" : "fade-right"}
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
