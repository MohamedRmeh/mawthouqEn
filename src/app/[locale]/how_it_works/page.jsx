"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { useLocale } from "next-intl";

const HowItWorks = () => {
  const [content, setContent] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lang = useLocale();

  useEffect(() => {
    setRedirectUrl(localStorage.getItem("redirect_url") || undefined);

    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/sections/how_it_works?lang=${lang}`
        );
        setContent(response.data.content);
      } catch (err) {
        setError("فشل في تحميل كيفية عمل المنصة");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading)
    return (
      <section className="max-w-5xl mx-auto px-6 py-16 animate-pulse text-gray-300">
        <div className="h-10 bg-gray-300 rounded w-1/2 mb-6 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-32 bg-gray-300 rounded"></div>
          ))}
        </div>
      </section>
    );

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!content) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">
        {content.how_it_works_title}
      </h1>

      <p className="mb-6 text-lg text-center">
        {parse(content.how_it_works_intro)}
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {Array.from({ length: 6 }).map((_, index) => {
          const step = index + 1;
          return (
            <div
              key={step}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-500 mb-2">
                {content[`how_it_works_step_${step}_title`]}
              </h2>
              <p>{content[`how_it_works_step_${step}_desc`]}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-4 text-blue-600">
          {content.how_it_works_cta_title}
        </h3>
        <p className="mb-6">{content.how_it_works_cta_desc}</p>
        {redirectUrl && (
          <a
            target="_blank"
            href={redirectUrl}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            {content.how_it_works_cta_button}
          </a>
        )}
      </div>
    </section>
  );
};

export default HowItWorks;
