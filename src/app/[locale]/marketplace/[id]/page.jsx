"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutSection from "@/components/navigation/marketPlace/CheckoutSection";
import Recommended from "@/components/navigation/marketPlace/Recommended";
import { Inter } from "next/font/google";
import { useTranslations, useLocale } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

const Page = () => {
  const lang = useLocale();
  const t = useTranslations("checkout");
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(lang);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/websites/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching website data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="w-full px-4 md:px-20 mt-14 mb-20 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-6 md:col-span-2">
            <div className="h-8 bg-gray-300 rounded w-3/4" />
            <div className="h-5 bg-gray-200 rounded w-2/3" />

            <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-5 border border-gray-200">
              <div className="w-full max-w-[320px] h-[200px] bg-gray-300 rounded-xl" />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent md:h-[200px] md:w-px md:bg-gradient-to-b hidden md:block" />
              <div className="flex flex-col gap-3 text-sm md:text-base text-center md:text-left w-full">
                <div className="bg-gray-200 h-4 rounded w-2/3 mx-auto md:mx-0" />
                <div className="bg-gray-200 h-4 rounded w-1/2 mx-auto md:mx-0" />
                <div className="bg-gray-200 h-4 rounded w-3/4 mx-auto md:mx-0" />
              </div>
            </div>

            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>

          <div className="h-[400px] bg-gray-200 rounded-xl" />
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <div className="text-red-600 text-center mt-10">
        Failed to load website data.
      </div>
    );
  }

  // helper (اختياري: ضعها فوق المكوّن أو في ملف utils)
  // ينسّق "YYYY-MM-DD HH:mm:ss" بشكل واضح بدون GMT
  const formatYmdHms = (
    s,
    locale = "ar",
    { asUTC = false, includeSeconds = true } = {}
  ) => {
    if (!s) return "";
    const [datePart, timePart] = s.trim().split(" ");
    if (!datePart || !timePart) return s;

    const [y, m, d] = datePart.split("-").map(Number);
    const [hh, mm, ss] = timePart.split(":").map(Number);

    const dt = asUTC
      ? new Date(Date.UTC(y, m - 1, d, hh, mm, ss))
      : new Date(y, m - 1, d, hh, mm, ss);

    const opts = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    if (includeSeconds) opts.second = "2-digit";
    if (asUTC) opts.timeZone = "UTC"; // نحدّد التوقيت لكن لا نعرض اسمه

    return new Intl.DateTimeFormat(locale, opts).format(dt);
  };

  return (
    <section className={`w-full px-4 md:px-20 mt-14 mb-20`}>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="flex flex-col gap-10 md:col-span-2">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-4xl text-[#21275c] font-bold leading-snug capitalize max-w-[95%]">
              {t.rich("featuredText", {
                name: () => <span className="text-blue-700">{data.name}</span>,
                category: () => (
                  <span className="text-blue-700">{data.category}</span>
                ),
              })}
            </h1>

            <p className="text-slate-600 text-base md:text-lg">
              {t.rich("boostText", {
                name: () => <span className="text-blue-700">{data.name}</span>,
              })}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-5 border border-gray-200">
            <Image
              width={320}
              height={320}
              src={data?.image || "/images/testImg.jpeg"}
              alt={data.name}
              className="rounded-xl object-contain shadow-md w-full max-w-[320px] h-45 drop-shadow-lg p-5"
            />
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent md:h-[200px] md:w-px md:bg-gradient-to-b hidden md:block" />
            <div
              className={`flex flex-col gap-3 text-gray-800 text-sm md:text-base text-center md:overflow-auto md:max-h-50 scroll-hidden ${
                lang === "en" ? "md:text-left" : "md:text-right"
              }`}
            >
              <Link
                href={data.url}
                target="_blank"
                className="text-blue-600 underline font-semibold hover:text-blue-800 transition"
              >
                {data.url}
              </Link>
              <span className="font-medium">
                {t("contentType")}:{""}{" "}
                {t(`${data.content_type.toLowerCase()}`)}
              </span>{" "}
              <span>
                {t("publishedWithin")}
                <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                  {data.avg_publish_time} {t("businessDays")}
                </span>
              </span>
              {data?.views && (
                <span>
                  {t("estimatedViews")} :{" "}
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                    {data?.views.toLocaleString()}
                  </span>
                </span>
              )}
              {data?.language && (
                <span>
                  {t("language")}:{" "}
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                    {{
                      Arabic: lang === "ar" ? "العربية" : "arabic",
                      English: lang === "en" ? "English" : "إنجليزية",
                    }[data?.language] || ""}
                  </span>
                </span>
              )}
              {data?.category && (
                <span>
                  {t("category")}:{" "}
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                    {t(`categories.${data.category}`)}
                  </span>
                </span>
              )}
              {data?.domain_authority && (
                <span>
                  {t("da")}:{" "}
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                    {`${data?.domain_authority}`}
                  </span>
                </span>
              )}
              {data?.domain_authority_updated_at && (
                <span>
                  {t("daUpdate")}:{" "}
                  <span
                    className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700"
                    title={data?.domain_authority_updated_at}
                  >
                    {formatYmdHms(
                      data?.domain_authority_updated_at,
                      typeof i18n !== "undefined" && i18n.language
                        ? i18n.language
                        : typeof navigator !== "undefined"
                        ? navigator.language
                        : "en"
                    )}
                  </span>
                </span>
              )}
              {data?.ratings_summary?.final_score !== undefined && (
                <span>
                  {t("rating")}:{" "}
                  <span className="text-yellow-500 text-xl">
                    {"★".repeat(data.ratings_summary.final_score)}
                    {"☆".repeat(5 - data.ratings_summary.final_score)}
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="text-base md:text-lg leading-relaxed text-gray-700">
            <p className="leading-relaxed mb-2 font-semibold text-gray-700">
              {t("lastType")}
            </p>
            <p className="mb-5">{data.description}</p>
          </div>
        </div>

        {/* Checkout Section */}
        <CheckoutSection websiteData={data} />
      </div>

      {/* Recommended */}
      <Recommended id={id} />
    </section>
  );
};

export default Page;
