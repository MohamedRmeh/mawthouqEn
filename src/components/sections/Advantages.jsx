import React from "react";
import {
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaChartLine,
  FaHeadset,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

const Advantages = () => {
  const t = useTranslations("Advantages");

  const advantagesData = [
    {
      icon: <FaRocket size={30} className="text-[#21275c]" />,
      title: t("items.0.title"),
      text: t("items.0.text"),
    },
    {
      icon: <FaShieldAlt size={30} className="text-[#21275c]" />,
      title: t("items.1.title"),
      text: t("items.1.text"),
    },
    {
      icon: <FaUsers size={30} className="text-[#21275c]" />,
      title: t("items.2.title"),
      text: t("items.2.text"),
    },
    {
      icon: <FaGlobe size={30} className="text-[#21275c]" />,
      title: t("items.3.title"),
      text: t("items.3.text"),
    },
    {
      icon: <FaChartLine size={30} className="text-[#21275c]" />,
      title: t("items.4.title"),
      text: t("items.4.text"),
    },
    {
      icon: <FaHeadset size={30} className="text-[#21275c]" />,
      title: t("items.5.title"),
      text: t("items.5.text"),
    },
  ];

  return (
    <section className="mb-26 py-12 px-4 mt-8">
      <div>
        <div
          data-aos="fade-up"
          className="flex flex-col gap-1 md:gap-4 justify-center items-center text-center mb-14"
        >
          <h1 className="text-2xl md:text-5xl font-semibold text-[#21275c]">
            {t("title")}
          </h1>
          <p className="md:text-xl text-slate-600 max-w-2xl">
            {t("description")}
          </p>
        </div>

        {/* content */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {advantagesData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center border border-slate-300 p-6 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#21275c] mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
