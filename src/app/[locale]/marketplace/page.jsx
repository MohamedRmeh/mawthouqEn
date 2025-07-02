"use client";
import { useEffect, useState } from "react";
import FilterSide from "@/components/navigation/marketPlace/FilterSide";
import { useTranslations, useLocale } from "next-intl";
import Card from "@/components/navigation/marketPlace/Card";
import axios from "axios";

const Page = () => {
  const t = useTranslations("MarketPlace");
  const lang = useLocale() === "en";

  const [websites, setWebsites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterForm, setFilterForm] = useState("");
  const [pageUrl, setPageUrl] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/websites?${filterForm}`
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
    }/websites?${params.toString()}`;
    setPageUrl(newUrl);
  }, [filterForm]);

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

    fetchWebsites();
  }, [pageUrl]);

  return (
    <section className="min-h-screen px-4 sm:px-2 lg:px-8 pt-10 pb-20 bg-[#f5f7fa] text-[#21275c]">
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
        <FilterSide setFilterForm={setFilterForm} />
        <Card
          websites={websites}
          loading={loading}
          onPageChange={(url) => setPageUrl(url)}
        />
      </div>
    </section>
  );
};

export default Page;
