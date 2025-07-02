import React from "react";
import Link from "next/link";

import {
  FaRocket,
  FaHospitalAlt,
  FaLightbulb,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";
import { useLocale } from "next-intl";

const Categories = ({ texts }) => {
  const lang = useLocale() === "en";

  const categories = [
    {
      icon: <FaRocket className="text-blue-600 md:text-5xl text-3xl" />,
      name: texts?.items[0],
      href: "/",
    },
    {
      icon: <FaHospitalAlt className="text-blue-600 md:text-5xl text-3xl" />,
      name: texts?.items[1],
      href: "/",
    },
    {
      icon: <FaLightbulb className="text-blue-600 md:text-5xl text-3xl" />,
      name: texts?.items[2],
      href: "/",
    },
    {
      icon: <FaChartBar className="text-blue-600 md:text-5xl text-3xl" />,
      name: texts?.items[3],
      href: "/",
    },
    {
      icon: <FaFileAlt className="text-blue-600 md:text-5xl text-3xl" />,
      name: texts?.items[4],
      href: "/",
    },
  ];

  return (
    <section className="mt-26 overflow-hidden">
      <div className="md:px-26 px-8 mt-16 mb-20">
        <div className="w-full">
          <div className="grid md:grid-cols-2 items-center mb-24 gap-4">
            <div
              data-aos={lang ? "fade-right" : "fade-left"}
              className="space-y-6"
            >
              <span className="block w-28 h-[9px] bg-blue-600"></span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#21275c] leading-tight">
                {texts?.title}
              </h1>
            </div>
            <p
              data-aos={lang ? "fade-left" : "fade-right"}
              className="text-base sm:text-lg md:text-xl text-slate-700"
            >
              {texts?.description}
            </p>
          </div>

          {/* Category section */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 justify-items-center"
          >
            {categories.map((category, index) => (
              <div key={index}>
                <div className="flex flex-col items-center text-center space-y-4 transition-transform duration-300 hover:scale-105">
                  {category.icon}
                  <p className="md:text-xl font-medium text-slate-800">
                    {category.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
