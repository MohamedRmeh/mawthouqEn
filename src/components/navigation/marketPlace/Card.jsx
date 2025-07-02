"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const Card = ({ websites, loading, onPageChange }) => {
  const locale = useLocale();
  const t = useTranslations("MarketPlace");

  if (loading || !websites) {
    return (
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 items-start animate-pulse">
          {[...Array(12)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-300"
            >
              <div className="w-full h-42 bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="flex justify-between mt-4">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const {
    data: platforms,
    current_page,
    last_page,
    next_page_url,
    prev_page_url,
  } = websites;

  const handlePageChange = (url) => {
    onPageChange(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full md:w-3/4">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 items-start">
        {platforms?.length === 0 || platforms?.length === undefined ? (
          <div className="w-full col-span-full flex flex-col items-center justify-center text-center py-20 text-gray-500">
            <p className="text-xl font-semibold">{t("empityText")}</p>
            <p className="text-gray-400 mt-2">{t("empitySubText")}</p>
          </div>
        ) : (
          platforms?.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-300 flex flex-col h-[290px]" // <-- height ثابت
            >
              <Link locale={locale} href={`/marketplace/${site.id}`}>
                <img
                  src={site?.image || "/images/testImg.jpeg"}
                  alt={site.name}
                  className="w-full h-40 object-contain border-b border-slate-300 cursor-pointer"
                />
              </Link>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-lg font-semibold mb-1 line-clamp-1">
                    {site.name}
                  </h2>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 underline text-sm break-words line-clamp-1"
                  >
                    {site.url}
                  </a>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-[#21275c] line-clamp-1">
                    {site.price ? `$${(site.price * 1.2).toFixed(2)}` : "$0"}
                  </span>
                  {site?.views && (
                    <span className="text-gray-500 line-clamp-1">
                      {site?.views || "0"} views
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {platforms?.length > 0 && (
        <div className="mt-10 flex justify-center gap-2 flex-wrap items-center">
          {/* Prev */}
          <button
            onClick={() => prev_page_url && handlePageChange(prev_page_url)}
            disabled={!prev_page_url}
            className={`px-3 py-1 rounded-full border text-sm cursor-pointer bg-white text-[#21275c] hover:bg-slate-100 border-slate-400`}
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
                    `${process.env.NEXT_PUBLIC_API_URL}/websites?page=${page}`
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
            className={`px-3 py-1 rounded-full border text-sm cursor-pointer bg-white text-[#21275c] hover:bg-slate-100 border-slate-400`}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
