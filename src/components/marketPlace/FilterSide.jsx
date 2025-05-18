"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

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
        {value ? t(value) : "Select"}
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
            const translatedOption = t(option);
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

const FilterSide = ({ onFilterChange }) => {
  const t = useTranslations("MarketPlace");
  const defaultFilters = {
    search: "",
    language: "",
    contentType: [],
    price: 250,
    domainAuthority: "",
    speed: "",
    audience: "",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [showAllTypes, setShowAllTypes] = useState(false);

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleCheckboxChange = (value) => {
    let updatedContentType = [...filters.contentType];
    if (updatedContentType.includes(value)) {
      updatedContentType = updatedContentType.filter((v) => v !== value);
    } else {
      updatedContentType.push(value);
    }
    handleInputChange("contentType", updatedContentType);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
    setShowAllTypes(false);
  };

  const allContentTypes = [
    "pressRelease",
    "guestPost",
    "sponsoredArticle",
    "interview",
    "productReview",
    "newsFeature",
    "editorial",
    "companyProfile",
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
          value={filters.search}
          onChange={(e) => handleInputChange("search", e.target.value)}
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
                type="checkbox"
                className="accent-blue-500"
                checked={filters.contentType.includes(type)}
                onChange={() => handleCheckboxChange(type)}
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
          {t("priceRange", { price: filters.price })}
        </label>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={filters.price}
          onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>

      {/* Domain Authority */}
      <CustomSelect
        label={t("domainAuthority")}
        value={filters.domainAuthority}
        options={["10+", "30+", "50+"]}
        onChange={(value) => {
          console.log("Selected Domain Authority:", value); // ✅ طباعة القيمة
          handleInputChange("domainAuthority", value);
        }}
      />

      {/* Publish Speed */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("publishSpeed")}
        </label>
        <div className="space-y-2">
          {["within24h", "2to3days", "1week"].map((speed) => (
            <label key={speed} className="flex items-center gap-2">
              <input
                type="radio"
                name="speed"
                className="accent-blue-500"
                value={speed}
                checked={filters.speed === speed}
                onChange={() => handleInputChange("speed", speed)}
              />
              {t(speed)}
            </label>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <CustomSelect
        label={t("targetAudience")}
        value={filters.audience}
        options={["global", "me", "na"]}
        onChange={(value) => {
          console.log("Selected Target Audience:", value); // ✅ الطباعة هنا
          handleInputChange("audience", value);
        }}
      />

      {/* Reset Button */}
      <div className="pt-2">
        <button
          onClick={resetFilters}
          className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-xl shadow text-sm transition"
        >
          {t("resetFilters")}
        </button>
      </div>
    </aside>
  );
};

export default FilterSide;
