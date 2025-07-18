"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RecomSocialMedia from "@/components/socialmedia/RecomSocialMedia";
import { useTranslations, useLocale } from "next-intl";
import CheckoutSocial from "@/components/socialmedia/CheckoutSocial";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("socialAccountPage");
  const lang = useLocale();

  useEffect(() => {
    const fetchSocialAccount = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/social-accounts/${id}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSocialAccount();
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
              <div className="w-40 h-40 bg-gray-300 rounded-full object-contain shadow-md text-white flex justify-center items-center" />
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

  return (
    <section className="w-full px-4 md:px-20 mt-14 mb-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="flex flex-col gap-10 md:col-span-2">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-4xl text-[#21275c] font-bold leading-snug capitalize max-w-[95%]">
              {data.account_name} / @{data.username}
            </h1>

            <p className="text-slate-600 text-base md:text-lg">
              {t("promoteWithCreator")}{" "}
              <span className="text-blue-700 font-semibold">
                {data.category}
              </span>{" "}
              {t("onPlatform")}{" "}
              <span className="text-blue-700 font-semibold">
                {data.platform}
              </span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-5 border border-gray-200">
            {data.account_image ? (
              <Image
                width={320}
                height={320}
                src={data?.account_image}
                alt={data?.account_name}
                className="object-contain shadow-md w-40 h-40 rounded-full text-white flex justify-center items-center"
              />
            ) : (
              <div className="bg-slate-400 w-40 h-40 rounded-full text-white flex justify-center items-center">
                {t("noImage")}
              </div>
            )}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent md:h-[200px] md:w-px md:bg-gradient-to-b hidden md:block" />
            <div
              className={`flex flex-col gap-3 text-gray-800 text-sm md:text-base text-center ${
                lang === "en" ? "md:text-left" : "md:text-right"
              } `}
            >
              <Link
                href={data?.profile_url || ""}
                target="_blank"
                className="text-blue-600 underline font-semibold hover:text-blue-800 transition"
              >
                {t("profileLink")}
              </Link>

              <span>
                {t("followers")}: {""}
                <span className="ml-1 bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                  {data.followers_count.toLocaleString()}
                </span>
              </span>

              <span>
                {t("contentType")}: {""}
                <span className="ml-1 text-blue-700 font-semibold capitalize">
                  {data.accepted_content_types.join(", ")}
                </span>
              </span>

              <span>
                {t("publishingTime")}: {""}
                <span className="ml-1 bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                  {data.post_duration_days} {t("days")}
                </span>
              </span>

              <span>
                {t("verified")}: {""}
                {data.is_verified ? (
                  <span className="ml-1 text-green-600 font-semibold">
                    {t("verifiedSymbol")}
                  </span>
                ) : (
                  <span className="ml-1 text-red-600">
                    {t("notVerifiedSymbol")}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="text-base md:text-lg leading-relaxed text-gray-700">
            <p className="leading-relaxed mb-5 font-semibold text-gray-700">
              {t("aboutAccount")}
            </p>
            <p className="mb-5">{data?.notes || t("noDescription")}</p>

            <p className="font-semibold mb-2">{t("ratings")}</p>
            <ul className={` ${lang === "en" ? "ml-" : "mr-"}  list-disc`}>
              <li className="flex items-center gap-2">
                {t("finalScore")}:
                {data?.ratings_summary.final_score > 0 ? (
                  <span className="text-yellow-500 text-xl">
                    {"★".repeat(data?.ratings_summary.final_score)}
                    {"☆".repeat(5 - data?.ratings_summary.final_score)}
                  </span>
                ) : (
                  <span className="text-gray-400 text-xl">{"☆☆☆☆☆"}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Checkout Section */}
        <CheckoutSocial socialData={data} />
      </div>

      {/* Recommended */}
      <RecomSocialMedia id={data.id} />
    </section>
  );
};

export default Page;
