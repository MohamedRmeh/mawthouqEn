"use client";

import { useEffect, useState } from "react";
import FilterSide from "@/components/navigation/marketPlace/FilterSide";
import { useTranslations, useLocale } from "next-intl";
import Card from "@/components/navigation/marketPlace/Card";
import axios from "axios";

const Page = () => {
  const t = useTranslations("MarketPlace");
  const tf = useTranslations("MarketPlace.filters");
  const lang = useLocale() === "en";

  // نخزّن الـ category كسلاگ متوافق مع ملف الترجمة والـ API (مثال: legal)
  const [filterForm, setFilterForm] = useState({
    category: "",
    page: 1,
  });

  const [websites, setWebsites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageUrl, setPageUrl] = useState("");

  // —— قائمة الكاتيجوري كـ slugs لتطابق مفاتيح الترجمة cat.<slug> والـ API —— //
const categories = [
  "",
  "legal",
  "agriculture",
  "animals",
  "architecture-construction",
  "arts",
  "automotive",
  "business",
  "cryptocurrency",
  "e-commerce",
  "fashion-beauty",
  "financial",
  "food-cuisine",
  "gaming",
  "general-news",
  "green-energy-ecology",
  "health-medicine",
  "hobbies-leisure",
  "human-resources",
  "kids-parenting",
  "lifestyle",
  "local-news",
  "logistics",
  "manufacturing-industrial",
  "marketing-pr",
  "mens",
  "music-movie",
  "real-estate",
  "religion",
  "science-education",
  "sensitive",
  "sports",
  "technology",
  "trading",
  "transportation",
  "travel",
  "womens",
];


  // تحديث رابط API كلما تغيرت الفلاتر
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filterForm).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== "" && value !== undefined && value !== null) {
        params.append(key, value);
      }
    });

    const base = `${process.env.NEXT_PUBLIC_API_URL}/websites`;
    const q = params.toString();
    const newUrl = q ? `${base}?${q}` : base;
    setPageUrl(newUrl);
  }, [filterForm]);

  // جلب البيانات من السيرفر
  useEffect(() => {
    const fetchWebsites = async () => {
      setLoading(true);
      try {
        const response = await axios.get(pageUrl);
        setWebsites(response.data);
      } catch (error) {
        console.error("Error fetching websites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (pageUrl) fetchWebsites();
  }, [pageUrl]);

  return (
    <section className="min-h-screen px-4 sm:px-2 lg:px-8 pt-10 pb-20 bg-[#f5f7fa] text-[#21275c]">
      <div
        className={`text-center ${
          lang ? "md:text-left" : "md:text-right"
        } mb-7`}
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-3 text-[#21275c] md:max-w-[90%]">
          {t("topContent")}
        </h1>
        <p className="md:text-lg text-gray-600 md:max-w-[80%]">
          {t("midContent")}
        </p>
      </div>

      {/* ====== نفس أسلوب السوشيال: فلاتر أعلى الصفحة (خارج FilterSide) ====== */}
      <div className="w-full mb-7">
        <div className="grid items-center md:grid-cols-1 gap-6">
          {/* Filter: Category */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#21275c]">
              {tf("category")}
            </label>

            {/* سكرول لرؤية باقي الخيارات بدون ما يأثر على تخطيط الكروت */}
            <div className="flex flex-wrap gap-3 max-h-40 overflow-auto pr-2">
              {categories.map((slug) => {
                const isSelected =
                  filterForm.category === slug ||
                  (!slug && !filterForm.category);
                // نستخدم slug مباشرة ليتطابق مع مفاتيح الترجمة cat.<slug>
                const label =
                  slug === ""
                    ? tf("all")
                    : tf(`cat.${slug}`, { default: slug });

                return (
                  <button
                    key={slug || "all"}
                    onClick={() =>
                      setFilterForm((prev) => ({
                        ...prev,
                        category: slug, // يرسل parameter مثل /websites?category=legal
                        page: 1, // نرجع لأول صفحة
                      }))
                    }
                    className={`px-4 py-2 rounded-full border font-medium capitalize shadow-sm transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#21275c] text-white border-[#21275c]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ====== شبكة المحتوى تبقى كما هي تمامًا ====== */}
      <div className="flex flex-col md:flex-row gap-5">
        <FilterSide
          setFilterForm={(newFilters) =>
            setFilterForm((prev) => ({ ...prev, ...newFilters, page: 1 }))
          }
        />
        <Card
          websites={websites}
          loading={loading}
          onPageChange={(url) => {
            const urlObj = new URL(url);
            const page = urlObj.searchParams.get("page") || 1;
            setFilterForm((prev) => ({ ...prev, page }));
          }}
        />
      </div>
    </section>
  );
};

export default Page;
