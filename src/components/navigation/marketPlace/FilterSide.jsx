"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import debounce from "lodash/debounce";

const CustomSelect = ({ label, value, options, onChange }) => {
  const t = useTranslations("MarketPlace");

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div
        onClick={() => setOpen(!open)}
        className="w-full p-3 rounded-xl border border-gray-300 bg-white text-sm shadow-sm cursor-pointer flex justify-between items-center"
      >
        {value ? t(value) : t("select")}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const translatedOption = t(String(option));
            const displayText =
              translatedOption === option ? option : translatedOption;

            return (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer ${
                  option === value ? "bg-blue-100 text-blue-600" : ""
                }`}
              >
                {displayText}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const FilterSide = ({ onFilterChange, setFilterForm }) => {
  const t = useTranslations("MarketPlace");
  const debouncedPriceUpdate = useCallback(
    debounce((value) => {
      handleInputChange("min_price", value);
    }, 300),
    []
  );

  const defaultFilters = {
    name: "",
    language: "",
    content_type: "",
    min_price: 0,
    domainAuthority: "",
    speed: "",
    audience: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [showAllTypes, setShowAllTypes] = useState(false);
  const [localPrice, setLocalPrice] = useState(0);
  useEffect(() => {
    setLocalPrice(filters.min_price);
  }, [filters.min_price]);

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
    setFilterForm?.(updatedFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
    setFilterForm?.(defaultFilters);
    setShowAllTypes(false);
  };

  const allContentTypes = [
    "blog",
    "local_news",
    "news_media",
    "interview",
    "news_agency",
    "portal",
    "social_media",
    "press_release",
    "company_profile",
  ];

  const visibleContentTypes = showAllTypes
    ? allContentTypes
    : allContentTypes.slice(0, 4);

  return (
    <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow sm:max-h-[868px] max-h-fit sm:overflow-y-auto space-y-6 scroll-hidden">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium mb-2">{t("search")}</label>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={filters.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("language")}
        </label>
        <div className="space-y-2">
          {["arabic", "english"].map((lang) => (
            <label key={lang} className="flex items-center gap-2">
              <input
                type="radio"
                name="language"
                className="accent-blue-500"
                value={lang}
                checked={filters.language === lang}
                onChange={() => handleInputChange("language", lang)}
              />
              {t(lang)}
            </label>
          ))}
        </div>
      </div>

      {/* Content Type */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("contentType")}
        </label>
        <div className="space-y-2">
          {visibleContentTypes.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="content_type"
                className="accent-blue-500"
                checked={filters.content_type === type}
                onChange={() => handleInputChange("content_type", type)}
              />
              {t(type)}
            </label>
          ))}

          {allContentTypes.length > 4 && (
            <button
              type="button"
              className="text-blue-600 text-sm underline mt-2 cursor-pointer"
              onClick={() => setShowAllTypes(!showAllTypes)}
            >
              {showAllTypes ? t("showLess") : t("showMore")}
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("priceRange", { min_price: filters.min_price })}
        </label>
        <input
          type="range"
          min="0"
          max="2000"
          step="10"
          value={localPrice}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            setLocalPrice(newValue); // تحديث فوري للشكل
            debouncedPriceUpdate(newValue); // تحديث مؤجل للفلاتر
          }}
          className="w-full accent-blue-500"
        />
      </div>

      {/* Domain Authority */}
      <CustomSelect
        label={t("domainAuthority")}
        value={filters.domainAuthority}
        options={[10, 30, 50, 70, 90]}
        onChange={(value) => {
          handleInputChange("domain_authority", value);
        }}
      />

      {/* Publish Speed */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("publishSpeed")}
        </label>
        <div className="space-y-2">
          {[
            { value: 1, label: "within24h" },
            { value: 2, label: "2days" },
            { value: 3, label: "3days" },
            { value: 4, label: "4days" },
            { value: 5, label: "5days" },
            { value: 6, label: "6days" },
            { value: 7, label: "1week" },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="radio"
                name="speed"
                className="accent-blue-500"
                value={value}
                checked={filters.max_avg_publish_time === value}
                onChange={() =>
                  handleInputChange("max_avg_publish_time", value)
                }
              />
              {t(label)}
            </label>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <CustomSelect
        label={t("targetAudience")}
        value={filters.audience}
        options={["global", "middle_east"]}
        onChange={(value) => {
          handleInputChange("audience", value);
        }}
      />

      {/* Reset Button */}
      <div className="pt-2">
        <button
          onClick={resetFilters}
          className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-xl shadow text-sm transition cursor-pointer"
        >
          {t("resetFilters")}
        </button>
      </div>
    </aside>
  );
};

export default FilterSide;
