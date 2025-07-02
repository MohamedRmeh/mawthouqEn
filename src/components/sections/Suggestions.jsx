"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLink } from "react-icons/fa";

const platforms = [
  { name: "Alam Al Mal", icon: <FaLink className="text-green-700" /> },
  { name: "Al Iqtissadi", icon: <FaLink className="text-blue-600" /> },
  { name: "Al Arabiya Net", icon: <FaLink className="text-red-600" /> },
  { name: "Al Bayan", icon: <FaLink className="text-yellow-500" /> },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Suggestions = ({ texts }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const t = texts;
  return (
    <section ref={sectionRef} className="mt-20 px-4">
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-[#21275c]"
        >
          {t?.topTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-slate-500 mt-1"
        >
          {t?.mainTitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-sm bg-white hover:scale-105 transition-transform duration-300 cursor-pointer border border-slate-300"
            custom={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            <div className="text-5xl mb-4">{platform.icon}</div>
            <p className="text-lg font-semibold text-slate-700">
              {platform.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Suggestions;
