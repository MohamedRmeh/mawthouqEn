import React from "react";
import {
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaChartLine,
  FaHeadset,
} from "react-icons/fa";

const advantagesData = [
  {
    icon: <FaRocket size={30} className="text-[#21275c]" />,
    title: "Fast Delivery",
    text: "We ensure quick and reliable news distribution.",
  },
  {
    icon: <FaShieldAlt size={30} className="text-[#21275c]" />,
    title: "Secure & Trusted",
    text: "Your stories are in safe hands with us.",
  },
  {
    icon: <FaUsers size={30} className="text-[#21275c]" />,
    title: "Wide Audience",
    text: "Reach thousands of active readers worldwide.",
  },
  {
    icon: <FaGlobe size={30} className="text-[#21275c]" />,
    title: "Global Reach",
    text: "Publish in multiple countries and languages.",
  },
  {
    icon: <FaChartLine size={30} className="text-[#21275c]" />,
    title: "Proven Results",
    text: "Backed by data and real success stories.",
  },
  {
    icon: <FaHeadset size={30} className="text-[#21275c]" />,
    title: "24/7 Support",
    text: "Always here to help with your needs.",
  },
];

const Advantages = () => {
  return (
    <section className="mb-26 py-12 px-4 mt-8">
      <div>
        <div
          data-aos="fade-up"
          className="flex flex-col gap-1 md:gap-4 justify-center items-center text-center mb-14"
        >
          <h1 className="text-2xl md:text-5xl font-semibold text-[#21275c]">
            Why use Mawthouq Post?
          </h1>
          <p className="md:text-xl text-slate-600 max-w-2xl">
            With years of experience and over 10,000 published news stories, you
            can expect the best results publishing with us.
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
