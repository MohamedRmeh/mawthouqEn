import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const Categories = () => {
  const t = useTranslations("Categories");
  const lang = useLocale() === "en" ? true : false;

  const categories = [
    {
      image:
        "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fsuccess_rocketship_9ba5cb71b9.webp&w=384&q=75",
      name: t("items.0"),
      href: "/",
    },
    {
      image:
        "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fhealth_buildings_c1f015bcc3.webp&w=384&q=75",
      name: t("items.1"),
      href: "/",
    },
    {
      image:
        "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fdesign_lightbulbs_Chat_Phone_9122827af3.webp&w=384&q=75",
      name: t("items.2"),
      href: "/",
    },
    {
      image:
        "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fdata_chart_9b8d168119.webp&w=384&q=75",
      name: t("items.3"),
      href: "/",
    },
    {
      image:
        "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fcommunication_writing_Document_d0eb442695.webp&w=384&q=75",
      name: t("items.4"),
      href: "/",
    },
  ];

  return (
    <section className="mt-26 overflow-hidden">
      <div className="md:px-26 px-8 mt-16 mb-20">
        <div className="w-full">
          <div className="grid md:grid-cols-2 items-center mb-24 gap-4">
            <div
              data-aos={lang ? "fade-right" : "fade-left"}
              className="space-y-6"
            >
              <span className="block w-28 h-[9px] bg-blue-600"></span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#21275c] leading-tight">
                {t("title")}
              </h1>
            </div>
            <p
              data-aos={lang ? "fade-left" : "fade-right"}
              className="text-base sm:text-lg md:text-xl text-slate-700"
            >
              {t("description")}
            </p>
          </div>

          {/* Category section */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 justify-items-center"
          >
            {categories.map((category, index) => (
              <Link href={category.href} key={index}>
                <div className="flex flex-col items-center text-center space-y-4 transition-transform duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="md:w-28 md:h-28 w-20 h-20 object-contain"
                  />
                  <p className="md:text-xl font-medium text-slate-800">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
