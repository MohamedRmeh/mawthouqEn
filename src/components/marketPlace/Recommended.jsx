"use client";
import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Inter, Almarai } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const almarai = Almarai({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const platforms = [
  {
    id: 2,
    name: "AlJazeera",
    img: "/images/testImg.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 3,
    name: "AlJazeera",
    img: "/images/testImg2.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 4,
    name: "AlJazeera",
    img: "/images/testImg.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 5,
    name: "AlJazeera",
    img: "/images/testImg2.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
];

const Recommended = () => {
  const t = useTranslations("Recommended");
  const locale = useLocale();

  const fontClass = locale === "en" ? inter.className : almarai.className;

  return (
    <section className={`${fontClass} py-10 sm:px-8 lg:px-14 mt-20`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-semibold text-[#21275c] mb-10 text-center">
          {t("topContent")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {platforms.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 border border-slate-200"
            >
              <Link href={`/marketplace/${site.id}`}>
                <img
                  src={site.img}
                  alt={site.name}
                  className="w-full h-44 object-cover cursor-pointer border-b border-slate-200"
                />
              </Link>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-[#21275c] mb-1">
                  {site.name}
                </h2>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 underline text-sm break-words"
                >
                  {site.url}
                </a>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-bold text-[#21275c]">{site.price}</span>
                  <span className="text-gray-500">{site.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommended;
