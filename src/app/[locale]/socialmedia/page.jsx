"use client";

import { useEffect, useState } from "react";
import FilterSide from "@/components/navigation/marketPlace/FilterSide";
import CardSocial from "@/components/socialmedia/CardSocial";
import { useTranslations, useLocale } from "next-intl";
import axios from "axios";

const Page = () => {
  const t = useTranslations("socialMedia");
  const tf = useTranslations("socialMedia.filters");
  const lang = useLocale() === "en";

  const [socialAccounts, setSocialAccounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterForm, setFilterForm] = useState({
    category: "",
    post_duration_days: "",
  });

  const [pageUrl, setPageUrl] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/social-accounts`
  );

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filterForm).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== "") {
        params.append(key, value);
      }
    });
    const newUrl = `${
      process.env.NEXT_PUBLIC_API_URL
    }/social-accounts?${params.toString()}`;
    setPageUrl(newUrl);
  }, [filterForm]);

  useEffect(() => {
    const fetchSocialAccounts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(pageUrl);
        setSocialAccounts(response.data);
      } catch (err) {
        setError("حدث خطأ أثناء جلب البيانات.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialAccounts();
  }, [pageUrl]);

  const categories = [
    "",
    "fashion",
    "tech",
    "fitness",
    "food",
    "travel",
    "education",
    "beauty",
    "gaming",
    "music",
    "art",
    "sports",
    "health",
    "business",
    "news",
    "pets",
    "lifestyle",
    "diy",
    "parenting",
    "finance",
  ];

  return (
    <section className="min-h-screen px-4 sm:px-2 lg:px-8 pt-10 pb-20 bg-[#f5f7fa] text-[#21275c]">
      <div
        className={`text-center ${
          lang ? "md:text-left" : "md:text-right"
        } mb-7`}
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-3 text-[#21275c]">
          {t("topTitle")}
        </h1>
        <p className="md:text-lg text-gray-600">{t("mainTitle")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full">
          {/* Filters Container with Grid */}
          <div className="grid items-center md:grid-cols-2 gap-6 mb-7">
            {/* Filter: Category */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[#21275c]">
                {tf("category")}
              </label>
              <div className="flex flex-wrap gap-3 max-h-40 overflow-auto xl:overflow-visible pr-2">
                {categories.map((cat) => {
                  const isSelected =
                    filterForm.category === cat ||
                    (cat === "" && !filterForm.category);
                  const label = cat === "" ? tf("all") : tf(`cat.${cat}`);
                  return (
                    <button
                      key={cat || "all"}
                      onClick={() =>
                        setFilterForm((prev) => ({
                          ...prev,
                          category: cat,
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

            {/* Filter: Post Duration (days) */}
            <div className="flex flex-col gap-1 max-w-xs">
              <label className="font-semibold text-[#21275c]">
                {tf("postDuration")}
              </label>
              <input
                type="number"
                min={1}
                placeholder={tf("postDurationPlaceholder")}
                value={filterForm.post_duration_days}
                onChange={(e) =>
                  setFilterForm({
                    ...filterForm,
                    post_duration_days: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#21275c] transition-shadow"
              />
            </div>
          </div>

          {/* محتوى الكروت */}
          <CardSocial
            data={socialAccounts}
            loading={loading}
            error={error}
            onPageChange={(url) => setPageUrl(url)}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
