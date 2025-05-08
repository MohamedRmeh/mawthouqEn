"use client";
import React, { useState, useRef } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const faqs = [
  {
    question: "What is your article distribution service?",
    answer:
      "We help you publish articles across high-authority news websites to boost your brand visibility, SEO, and online credibility.",
  },
  {
    question: "Can I choose which websites my article gets published on?",
    answer:
      "Yes, you can browse our list of partner websites, view metrics like domain authority, audience, and pricing, then select where you'd like to publish.",
  },
  {
    question:
      "Do you offer content writing, or do I need to provide the article?",
    answer:
      "You can either provide your own article or request professional content writing from our team for an additional fee.",
  },
  {
    question: "How long does it take for the article to be published?",
    answer:
      "Publishing time varies by website but typically takes between 1 to 5 business days after approval.",
  },
  {
    question: "How do I track the status of my publication request?",
    answer:
      "You can track your request in your dashboard under the 'My Orders' section. We'll also send you email updates at each step.",
  },
];

const QA = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleQuestion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="mt-26 px-5 md:px-28 mb-36">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-10">
        <div
          className="md:col-span-2 flex flex-col justify-center"
          data-aos="fade-right"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 relative inline-block w-fit">
            <span className="relative z-10 text-[#21275c]">
              Frequently Asked Questions
            </span>
            <span className="absolute left-0 bottom-1 h-2 w-full bg-gradient-to-r from-[#035E89] via-[#0494C4] to-[#21275C] opacity-40 rounded-lg -z-10"></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            Find quick answers to common questions about our article publishing
            services. Need more help? Contact our support team.
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
                  {faq.question}
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
                  {faq.answer}
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
