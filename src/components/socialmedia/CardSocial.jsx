"use client";
import React from "react";
import {
  SiInstagram,
  SiFacebook,
  SiX,
  SiYoutube,
  SiSnapchat,
} from "react-icons/si";
import { FaTiktok, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const CardSocial = ({ data, loading, error, onPageChange }) => {
  const router = useRouter();
  const lang = useLocale()
  const platformIcons = {
    instagram: <SiInstagram className="text-pink-500 w-4 h-4" />,
    facebook: <SiFacebook className="text-blue-600 w-4 h-4" />,
    tiktok: <FaTiktok className="text-black w-4 h-4" />,
    twitter: <SiX className="text-black w-4 h-4" />,
    youtube: <SiYoutube className="text-red-600 w-4 h-4" />,
    snapchat: <SiSnapchat className="text-[#ffc131] w-4 h-4" />,
  };

  const handlePageChange = (url) => {
    onPageChange(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) return <p className="text-red-500">{error}</p>;

  if (loading || !data) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(12)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col items-center text-center p-6 shadow-sm animate-pulse"
              style={{ width: "100%", height: "260px" }}
            >
              <div className="w-20 h-20 rounded-full bg-slate-200 mb-4" />
              <div className="flex items-center gap-2 justify-center mb-1 w-full">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="w-4 h-4 bg-slate-200 rounded-full" />
              </div>
              <div className="flex items-center justify-center gap-1 text-sm mb-2 w-full">
                <div className="w-4 h-4 bg-slate-200 rounded" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-2" />
              <div className="bg-slate-200 text-xs font-semibold px-3 py-2 rounded-full mt-auto w-3/4 h-5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const {
    data: items,
    current_page,
    last_page,
    next_page_url,
    prev_page_url,
  } = data;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((site) => (
          <div
            onClick={() => router.push(`/socialmedia/${site.id}`)}
            key={site.id}
            className=" bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col items-center text-center p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            style={{ width: "100%", height: "230px" }}
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
              {site?.account_image ? (
                <img
                  src={site?.account_image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 shadow-sm" />
              )}
            </div>
            <div className="flex items-center gap-2 justify-center mb-1">
              <h2 className="text-xl font-semibold truncate capitalize max-w-[180px]">
                {site.account_name}
              </h2>
              {site.is_verified && (
                <FaCheckCircle
                  className="text-green-500 text-lg"
                  title="Verified"
                />
              )}
            </div>
            <div dir="ltr" className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-2">
              {platformIcons[site.platform?.toLowerCase()] || (
                <div className="text-gray-400">?</div>
              )}
              <a
                href={site.profile_url}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate max-w-[160px]"
                title={`@${site.username}`}
              >
                @{site.username}
              </a>
            </div>
            <div className="text-sm text-gray-500">
              👥 {site.followers_count?.toLocaleString() || 0} {lang === "en" ? "Followers" : "متابع"}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {items.length > 0 && (
        <div className="mt-10 flex justify-center gap-2 flex-wrap items-center">
          {/* Prev */}
          <button
            onClick={() => prev_page_url && handlePageChange(prev_page_url)}
            disabled={!prev_page_url}
            className="px-3 py-1 rounded-full border text-sm cursor-pointer bg-white text-[#21275c] hover:bg-slate-100 border-slate-400 disabled:opacity-50"
          >
            ‹
          </button>

          {/* Pages */}
          {[...Array(last_page)].map((_, i) => {
            const page = i + 1;
            const isCurrent = current_page === page;
            return (
              <button
                key={page}
                onClick={() =>
                  handlePageChange(
                    `${process.env.NEXT_PUBLIC_API_URL}/socialmedia?page=${page}`
                  )
                }
                className={`px-3 py-1 rounded-full border text-sm transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#21275c] text-white font-semibold border-slate-500"
                    : "bg-white text-[#21275c] hover:bg-slate-100 border-slate-300"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => next_page_url && handlePageChange(next_page_url)}
            disabled={!next_page_url}
            className="px-3 py-1 rounded-full border text-sm cursor-pointer bg-white text-[#21275c] hover:bg-slate-100 border-slate-400 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default CardSocial;
