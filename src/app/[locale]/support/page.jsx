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

const SupportPage = () => {
  const t = useTranslations("Support");

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
            {t("supportTitle")}
          </h1>
          <p className="text-base md:text-xl text-[#21275c]/80 max-w-2xl mx-auto leading-relaxed">
            {t("supportDescription")}
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {t("faqTitle")}
          </h2>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 2}
                className="bg-[#f5f7fa] p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {t(`faqQuestion${i + 1}`)}
                </h3>
                <p className="text-[#21275c]/80 text-sm leading-relaxed">
                  {t(`faqAnswer${i + 1}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="py-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {t("contactSupportTitle")}
          </h2>
          <div className="max-w-4xl mx-auto">
            <form className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={t("yourName")}
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder={t("yourEmail")}
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                  />
                </div>
              </div>
              <div>
                <textarea
                  placeholder={t("yourMessage")}
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#475569] text-white py-3 px-6 rounded-xl hover:bg-[#3b4757] transition"
              >
                {t("sendMessage")}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Additional Support Options */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {t("additionalSupportTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[{ icon: "📞", title: t("callUs"), link: "#" }, { icon: "📧", title: t("emailUs"), link: "#" }, { icon: "💬", title: t("liveChat"), link: "#" }].map(
              (item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i + 6}
                  className="bg-[#f5f7fa] rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center"
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <a
                    href={item.link}
                    className="text-[#475569] hover:underline"
                  >
                    {t("getInTouch")}
                  </a>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportPage;
