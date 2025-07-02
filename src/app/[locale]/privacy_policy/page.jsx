"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { useLocale } from "next-intl";

const PrivacyPolicy = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lang = useLocale();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sections/privacy_policy?lang=${lang}`
        );
        setContent(response.data.content);
      } catch (err) {
        setError("فشل في تحميل سياسة الخصوصية");
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
      <h1 className="text-4xl font-bold mb-6 text-blue-600">{content.title}</h1>

      <p className="mb-4">{parse(content.intro)}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
        {content.info_title}
      </h2>
      <ul className="list-disc list-inside space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <li key={i}>{content[`info_item_${i}`]}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
        {content.use_title}
      </h2>
      <p className="mb-4">{content.use_intro}</p>
      <ul className="list-disc list-inside space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <li key={i}>{content[`use_item_${i}`]}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
        {content.share_title}
      </h2>
      <p className="mb-4">{content.share_intro}</p>
      <ul className="list-disc list-inside space-y-2">
        {[1, 2, 3].map((i) => (
          <li key={i}>{content[`share_item_${i}`]}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
        {content.security_title}
      </h2>
      <p className="mb-4">{content.security_text}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
        {content.cookies_title}
      </h2>
      <p className="mb-4">{content.cookies_text}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
        {content.rights_title}
      </h2>
      <p className="mb-4">{content.rights_text}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-blue-500">
        {content.contact_title}
      </h2>
      <p className="mb-4">
        {content.contact_text}{" "}
        <a
          href="mailto:support@mawthoqpost.com"
          className="text-blue-600 underline"
        >
          support@mawthoqpost.com
        </a>
      </p>

      <p className="text-sm text-gray-500 mt-8 text-center">
        {content.updated}
      </p>
    </section>
  );
};

export default PrivacyPolicy;
