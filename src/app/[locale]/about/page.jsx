"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const AboutPage = () => {
  const t = useTranslations("About");

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
            {t("aboutTitle")}
          </h1>
          <p className="text-base md:text-xl text-[#21275c]/80 max-w-2xl mx-auto leading-relaxed">
            {t("aboutDescription")}
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              title: t("ourMissionTitle"),
              text: t("ourMissionText"),
            },
            {
              title: t("ourVisionTitle"),
              text: t("ourVisionText"),
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i + 1}
              className="bg-[#f5f7fa] p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
              <p className="text-[#21275c]/80 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Us (Better Design with Cards + Icons) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="py-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {t("whyChooseTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "📰",
                title: t("wideMediaReachTitle"),
                text: t("wideMediaReachText"),
              },
              {
                icon: "⚙️",
                title: t("easyToUseTitle"),
                text: t("easyToUseText"),
              },
              {
                icon: "🤝",
                title: t("humanSupportTitle"),
                text: t("humanSupportText"),
              },
              {
                icon: "🚀",
                title: t("buildAuthorityTitle"),
                text: t("buildAuthorityText"),
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
