import React from "react";
import {
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaChartLine,
  FaHeadset,
} from "react-icons/fa";

const Advantages = ({ texts }) => {
  const icons = [
    <FaRocket size={30} className="text-[#21275c]" />,
    <FaShieldAlt size={30} className="text-[#21275c]" />,
    <FaUsers size={30} className="text-[#21275c]" />,
    <FaGlobe size={30} className="text-[#21275c]" />,
    <FaChartLine size={30} className="text-[#21275c]" />,
    <FaHeadset size={30} className="text-[#21275c]" />,
  ];

  const advantagesData = texts?.items.map((item, index) => ({
    icon: icons[index],
    title: item?.title,
    text: item?.text,
  }));

  return (
    <section className="mb-26 py-12 px-4 mt-8">
      <div>
        <div
          data-aos="fade-up"
          className="flex flex-col gap-1 md:gap-4 justify-center items-center text-center mb-14"
        >
          <h1 className="text-2xl md:text-5xl font-semibold text-[#21275c]">
            {texts?.title}
          </h1>
          <p className="md:text-xl text-slate-600 max-w-2xl">
            {texts?.description}
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
              <div className="mb-4">{item?.icon}</div>
              <h3 className="text-xl font-semibold text-[#21275c] mb-2">
                {item?.title}
              </h3>
              <p className="text-slate-600">{item?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
