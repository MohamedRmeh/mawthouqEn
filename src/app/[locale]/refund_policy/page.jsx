"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { useLocale } from "next-intl";

const RefundPolicy = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lang = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sections/refund_policy?lang=${lang}`
        );
        setContent(response.data.content);
      } catch (err) {
        setError("فشل في تحميل سياسة الاسترداد");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 animate-pulse text-gray-300">
        <div className="h-10 bg-gray-300 rounded w-1/2 mb-6"></div>
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="mb-8">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <ul className="space-y-2">
              {[...Array(3)].map((__, i) => (
                <li key={i} className="h-4 bg-gray-300 rounded w-2/3"></li>
              ))}
            </ul>
          </div>
        ))}
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-10 mx-auto"></div>
      </section>
    );

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!content) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        {content.refund_policy_title}
      </h1>

      <p className="mb-4">{parse(content.refund_policy_intro)}</p>

      {Array.from({ length: 5 }).map((_, i) => {
        const section = i + 1;
        return (
          <div key={section}>
            <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
              {content[`refund_policy_section_${section}_title`]}
            </h2>
            <div className="mb-4">
              {parse(content[`refund_policy_section_${section}_content`])}
            </div>
          </div>
        );
      })}

      <p className="text-sm text-gray-500 mt-8 text-center">
        {content.refund_policy_last_updated}
      </p>
    </section>
  );
};

export default RefundPolicy;
