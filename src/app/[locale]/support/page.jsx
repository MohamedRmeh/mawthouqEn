"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import emailjs from "emailjs-com";

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

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // success or error

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // الإيميل ثابت ترسله هنا في service/template
    const serviceID = "service_ohdcdi7";
    const templateID = "template_rzz4x4e";
    const publicKey = "RngFE4w9HFvxDWk64";

    // اعداد بيانات الإيميل حسب template
    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message,
      to_email: "mawthouqpost@gmail.com",
      reply_to: formData.from_email,
    };
    console.log(templateParams);
    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (response) => {
        setStatus("SUCCESS");
        console.log(response);
        setFormData({ from_name: "", from_email: "", message: "" });
      },
      (error) => {
        console.log(error);
        setStatus("ERROR");
      }
    );
  };

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="from_name"
                    placeholder={t("yourName")}
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    name="from_email"
                    placeholder={t("yourEmail")}
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                  />
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder={t("yourMessage")}
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#475569] text-white py-3 px-6 rounded-xl hover:bg-[#3b4757] transition cursor-pointer"
              >
                {t("sendMessage")}
              </button>
            </form>
            {status === "SUCCESS" && (
              <p className="mt-4 text-green-600 text-center">
                Your message has been sent successfully!
              </p>
            )}
            {status === "ERROR" && (
              <p className="mt-4 text-red-600 text-center">
                Failed to send your message. Please try again later.
              </p>
            )}
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
            {[
              { icon: "📞", title: t("callUs"), link: "#" },
              { icon: "📧", title: t("emailUs"), link: "#" },
              { icon: "💬", title: t("liveChat"), link: "#" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i + 6}
                className="bg-[#f5f7fa] rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportPage;
