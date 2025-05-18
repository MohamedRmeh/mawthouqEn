"use client";
import FilterSide from "@/components/marketPlace/FilterSide";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

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
    id: 1,
    name: "AlJazeera",
    img: "/images/testImg4.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 4,
    name: "AlJazeera",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 5,
    name: "AlJazeera",
    img: "/images/testImg.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 6,
    name: "AlJazeera",
    img: "/images/testImg2.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 7,
    name: "AlJazeera",
    img: "/images/testImg4.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 8,
    name: "AlJazeera",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 9,
    name: "AlJazeera",
    img: "/images/testImg.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 10,
    name: "AlJazeera",
    img: "/images/testImg2.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 11,
    name: "AlJazeera",
    img: "/images/testImg4.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 12,
    name: "AlJazeera",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 13,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 14,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 15,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 16,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 17,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 18,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 19,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 20,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 21,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 22,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 23,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 24,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 25,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 26,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 27,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 28,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 29,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 30,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 31,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 32,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 33,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 34,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 35,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 36,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 37,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 38,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 39,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 40,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 41,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 42,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 43,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 44,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 45,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 46,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 47,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 48,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 49,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 50,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 51,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 52,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 53,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
  {
    id: 54,
    name: "Londen Insider",
    img: "/images/testImg3.jpeg",
    url: "https://aljazeera.com",
    price: "$200",
    views: "120k",
  },
];

const Page = () => {
  const t = useTranslations("MarketPlace");
  const lang = useLocale() === "en";
  const locale = useLocale();

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(platforms.length / itemsPerPage);

  const paginatedPlatforms = platforms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // رجوع للأعلى
  };

  return (
    <section className="min-h-screen px-4 sm:px-2 lg:px-8 pt-10 pb-20 bg-[#f5f7fa] text-[#21275c]">
      {/* Header */}
      <div
        className={`text-center ${
          lang ? "md:text-left" : "md:text-right"
        } mb-12`}
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-3 text-[#21275c]">
          {t("topContent")}
        </h1>
        <p className="md:text-lg text-gray-600">{t("midContent")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <FilterSide />

        {/* Cards + Pagination */}
        <div className="w-full md:w-3/4">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 items-start">
            {paginatedPlatforms.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-300"
              >
                <Link locale={locale} href={`/marketplace/${site.id}`}>
                  <img
                    src={site.img}
                    alt={site.name}
                    className="w-full h-40 object-cover border-b border-slate-300 cursor-pointer"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{site.name}</h2>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 underline text-sm break-words"
                  >
                    {site.url}
                  </a>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-bold text-[#21275c]">
                      {site.price}
                    </span>
                    <span className="text-gray-500">{site.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

{/* Smart Pagination */}
<div className="mt-10 flex justify-center gap-2 flex-wrap items-center">
  {/* Previous Button */}
  <button
    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
    className="px-3 py-1 rounded-full border bg-white text-[#21275c] hover:bg-slate-100 text-sm"
    disabled={currentPage === 1}
  >
    ‹
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => {
      if (
        page === 1 || // Always show first
        page === totalPages || // Always show last
        Math.abs(page - currentPage) <= 1 // Show around current
      ) {
        return true;
      }
      if (
        (page === currentPage - 2 && currentPage > 4) ||
        (page === currentPage + 2 && currentPage < totalPages - 3)
      ) {
        return true;
      }
      return false;
    })
    .map((page, index, arr) => {
      const prevPage = arr[index - 1];
      if (prevPage && page - prevPage > 1) {
        return (
          <span key={`dots-${page}`} className="px-2 text-gray-400">
            ...
          </span>
        );
      }
      return (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-1 rounded-full border text-sm transition-all ${
            page === currentPage
              ? "bg-[#21275c] text-white font-semibold"
              : "bg-white text-[#21275c] hover:bg-slate-100 border-slate-300"
          }`}
        >
          {page}
        </button>
      );
    })}

  {/* Next Button */}
  <button
    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
    className="px-3 py-1 rounded-full border bg-white text-[#21275c] hover:bg-slate-100 text-sm"
    disabled={currentPage === totalPages}
  >
    ›
  </button>
</div>

        </div>
      </div>
    </section>
  );
};

export default Page;
