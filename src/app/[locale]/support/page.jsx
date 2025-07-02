"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
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

const SupportPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const lang = useLocale();

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/sections/support?lang=${lang}`)
      .then((res) => {
        setContent(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching support content:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_ohdcdi7";
    const templateID = "template_rzz4x4e";
    const publicKey = "RngFE4w9HFvxDWk64";

    const templateParams = {
      from_name: formData.from_name,
      from_email: formData.from_email,
      message: formData.message,
      to_email: "mawthouqpost@gmail.com",
      reply_to: formData.from_email,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      () => {
        setStatus("SUCCESS");
        setFormData({ from_name: "", from_email: "", message: "" });
      },
      () => {
        setStatus("ERROR");
      }
    );
  };

  if (loading || !content) {
    return (
      <section className="bg-white text-[#21275c]">
        <div className="max-w-6xl mx-auto px-6 py-20 space-y-20 animate-pulse">
          {/* Header Skeleton */}
          <div className="text-center space-y-4">
            <div className="h-8 md:h-12 w-3/4 mx-auto bg-gray-300 rounded"></div>
            <div className="h-4 md:h-6 w-2/3 mx-auto bg-gray-200 rounded"></div>
          </div>

          {/* FAQ Skeleton */}
          <div>
            <div className="h-8 md:h-10 w-1/2 mx-auto bg-gray-300 rounded mb-12"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#f5f7fa] p-6 rounded-2xl shadow-md space-y-3"
                >
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-3 w-full bg-gray-200 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Skeleton */}
          <div className="py-10 space-y-6 max-w-4xl mx-auto">
            <div className="h-8 md:h-10 w-1/2 mx-auto bg-gray-300 rounded mb-12"></div>

            <div className="flex gap-4">
              <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
              <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
            </div>

            <div className="h-32 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
          </div>

          {/* Additional Support Skeleton */}
          <div>
            <div className="h-8 md:h-10 w-1/2 mx-auto bg-gray-300 rounded mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#f5f7fa] rounded-2xl p-6 shadow-md text-center space-y-4"
                >
                  <div className="h-8 w-8 mx-auto bg-gray-300 rounded-full"></div>
                  <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded"></div>
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
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {content.supportTitle}
          </h1>
          <p className="text-base md:text-xl text-[#21275c]/80 max-w-2xl mx-auto leading-relaxed">
            {content.supportDescription}
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {content.faqTitle}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="bg-[#f5f7fa] p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {content[`faqQuestion${i}`]}
                </h3>
                <p className="text-[#21275c]/80 text-sm leading-relaxed">
                  {content[`faqAnswer${i}`]}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="py-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {content.contactSupportTitle}
          </h2>
          <div className="max-w-4xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="from_name"
                  placeholder={content.yourName}
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                />
                <input
                  type="email"
                  name="from_email"
                  placeholder={content.yourEmail}
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder={content.yourMessage}
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] border border-[#ddd] text-[#21275c] focus:outline-none focus:ring-2 focus:ring-[#475569] transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#475569] text-white py-3 px-6 rounded-xl hover:bg-[#3b4757] transition cursor-pointer"
              >
                {content.sendMessage}
              </button>
            </form>
            {status === "SUCCESS" && (
              <p className="mt-4 text-green-600 text-center">
                تم إرسال رسالتك بنجاح!
              </p>
            )}
            {status === "ERROR" && (
              <p className="mt-4 text-red-600 text-center">
                حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.
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
            {content.additionalSupportTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "📞", title: content.callUs },
              { icon: "📧", title: content.emailUs },
              { icon: "💬", title: content.liveChat },
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
