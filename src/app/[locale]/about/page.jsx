"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const AboutPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const lang = useLocale();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/sections/about?lang=${lang}`)
      .then((res) => {
        setContent(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching about content:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !content) {
    return (
      <section className="bg-white text-[#21275c]">
        <div className="max-w-6xl mx-auto px-6 py-20 space-y-20 animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center">
            <div className="h-8 md:h-12 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 md:h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>

          {/* Mission & Vision Skeleton */}
          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#f5f7fa] p-8 rounded-2xl shadow-md space-y-4"
              >
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>

          {/* Why Us Skeleton */}
          <div className="py-10">
            <div className="h-8 md:h-10 bg-gray-300 rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-[#f5f7fa] rounded-2xl p-6 shadow-md space-y-4"
                >
                  <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white text-[#21275c]">
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {content.aboutTitle}
          </h1>
          <p className="text-base md:text-xl text-[#21275c]/80 max-w-2xl mx-auto leading-relaxed">
            {content.aboutDescription}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: content.ourMissionTitle,
              text: content.ourMissionText,
            },
            {
              title: content.ourVisionTitle,
              text: content.ourVisionText,
            },
          ].map((item, i) => (
            <motion.div
              key={item?.title}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i + 1}
              className="bg-[#f5f7fa] p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{item?.title}</h2>
              <p className="text-[#21275c]/80 leading-relaxed">{item?.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Us */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="py-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {content.whyChooseTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "📰",
                title: content.wideMediaReachTitle,
                text: content.wideMediaReachText,
              },
              {
                icon: "⚙️",
                title: content.easyToUseTitle,
                text: content.easyToUseText,
              },
              {
                icon: "🤝",
                title: content.humanSupportTitle,
                text: content.humanSupportText,
              },
              {
                icon: "🚀",
                title: content.buildAuthorityTitle,
                text: content.buildAuthorityText,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 4}
                className="bg-[#f5f7fa] rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[#21275c]/80 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
