"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Inter, Almarai } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const almarai = Almarai({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const Recommended = ({ id }) => {
  const t = useTranslations("Recommended");
  const locale = useLocale();
  const fontClass = locale === "en" ? inter.className : almarai.className;

  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/websites/${id}/recommended`
        );
        setPlatforms(response.data);
      } catch (error) {
        console.error("Failed to fetch recommended platforms", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecommended();
    }
  }, [id]);

  return (
    <section className={`${fontClass} py-10  mt-20`}>
      <div className=" mx-auto">
        <h1 className="text-2xl sm:text-4xl font-semibold text-[#21275c] mb-10 text-center">
          {t("topContent")}
        </h1>

        <div className="flex flex-wrap gap-3 justify-center items-center">
          {!loading && platforms.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-5 capitalize">
              <p className="text-lg">{t("noResults")}</p>
            </div>
          ) : (
            platforms.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 border border-slate-200 w-full sm:w-[275px]"
              >
                <Link href={`/marketplace/${site.id}`}>
                  <img
                    src={site.image || "/images/testImg.jpeg"}
                    alt={site?.name}
                    className="w-full h-44 object-contain cursor-pointer border-b border-slate-200"
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
                    <span className="font-bold text-[#21275c]">
                      ${site?.price * 1.2}
                    </span>
                    {site?.views && (
                      <span className="text-gray-500">{site?.views} views</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Recommended;
