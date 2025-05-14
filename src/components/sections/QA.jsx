"use client";
import React, { useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useTranslations, useLocale } from "next-intl";

const faqs = [
  {
    questionKey: "faq1_question",
    answerKey: "faq1_answer",
  },
  {
    questionKey: "faq2_question",
    answerKey: "faq2_answer",
  },
  {
    questionKey: "faq3_question",
    answerKey: "faq3_answer",
  },
  {
    questionKey: "faq4_question",
    answerKey: "faq4_answer",
  },
  {
    questionKey: "faq5_question",
    answerKey: "faq5_answer",
  },
];

const QA = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);
  const t = useTranslations("QA");
  const lang = useLocale() === "en" ? true : false;

  const toggleQuestion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="mt-26 px-5 md:px-26 mb-36">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-10">
        <div
          className="md:col-span-2 flex flex-col justify-center"
          data-aos={lang ? "fade-right" : "fade-left"}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 relative inline-block w-fit">
            <span className="relative z-10 text-[#21275c]">{t("title")}</span>
            <span className="absolute left-0 bottom-1 h-2 w-full bg-gradient-to-r from-[#035E89] via-[#0494C4] to-[#21275C] opacity-40 rounded-lg -z-10"></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="md:col-span-3 flex flex-col gap-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-5 transition-all duration-300 shadow bg-white"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <h2 className="text-lg font-semibold text-slate-700 select-none">
                  {t(faq.questionKey)}
                </h2>
                {openIndex === index ? (
                  <AiOutlineMinus className="w-6 h-6 text-[#035E89]" />
                ) : (
                  <AiOutlinePlus className="w-6 h-6 text-[#035E89]" />
                )}
              </div>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  height:
                    openIndex === index
                      ? contentRefs.current[index]?.scrollHeight
                      : 0,
                }}
              >
                <div className="mt-1.5 text-gray-600 text-base">
                  {t(faq.answerKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QA;
