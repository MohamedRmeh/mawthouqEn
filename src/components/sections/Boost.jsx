import React from "react";
import { useTranslations, useLocale } from "next-intl";

const Boost = () => {
  const t = useTranslations("Boost");
  const lang = useLocale() === "en" ? true : false;

  return (
    <section className="bg-gradient-to-r from-[#2a2f65] via-[#2f396f] to-[#3c4b8b] rounded-lg my-10 mx-auto w-[95%] md:w-[86%] py-5 px-5 sm:px-8 mb-28">
      <div
        className={`flex flex-col md:flex-row items-center justify-between gap-6 text-center ${
          lang ? " md:text-left" : " md:text-right"
        }`}
      >
        {/* Left Content */}
        <div className="text-white space-y-4 lg:space-y-5">
          <h2 className="text-xl md:text-4xl font-bold">{t("title")}</h2>
          <p className="text-sm md:text-xl">{t("subtitle")}</p>
          <button className="bg-gradient-to-b from-[#0056f0] to-[#0040c0] text-white px-6 sm:px-15 py-3 rounded-md font-semibold text-sm lg:text-base uppercase shadow-md hover:brightness-110 transition-all duration-300 tracking-[0.5px]">
            {t("button")}
          </button>
        </div>

        {/* Right Image */}
        <div className="lg:flex-shrink-0 lg:block mt-6 md:mt-0 hidden">
          <img
            src="https://www.24-7pressrelease.com/assets/images/growyourbrand.png"
            alt="Grow Your Brand"
            className="w-32 sm:w-40 md:w-80 h-auto mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  );
};

export default Boost;
