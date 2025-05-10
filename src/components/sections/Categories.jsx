import React from "react";
import Link from "next/link";

const categories = [
  {
    image:
      "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fsuccess_rocketship_9ba5cb71b9.webp&w=384&q=75",
    name: "Industry-Specific Solutions",
    href: "/",
  },
  {
    image:
      "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fhealth_buildings_c1f015bcc3.webp&w=384&q=75",
    name: "Public Companies",
    href: "/",
  },
  {
    image:
      "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fdesign_lightbulbs_Chat_Phone_9122827af3.webp&w=384&q=75",
    name: "Agencies",
    href: "/",
  },
  {
    image:
      "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fdata_chart_9b8d168119.webp&w=384&q=75",
    name: "IR Professionals",
    href: "/",
  },
  {
    image:
      "https://www.businesswire.com/_next/image?url=https%3A%2F%2Fd1k42caodqw8lr.cloudfront.net%2Fcommunication_writing_Document_d0eb442695.webp&w=384&q=75",
    name: "PR & Corporate Communications",
    href: "/",
  },
];

const Categories = () => {
  return (
    <section
      className="
    mt-26
    overflow-hidden 
    "
    >
      <div className="md:px-26 px-8 mt-16 mb-20">
        <div className="w-full">
          <div className="grid md:grid-cols-2 items-center mb-24 gap-4">
            <div data-aos="fade-right" className="space-y-6">
              <span className="block w-28 h-[9px] bg-blue-600"></span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#21275c] leading-tight">
                Get Results with the <br /> Solutions You Need
              </h1>
            </div>
            <p
              data-aos="fade-left"
              className="text-base sm:text-lg md:text-xl text-slate-700"
            >
              Business Wire has decades of experience helping PR teams, IR
              professionals, and businesses of all sizes break through the
              noise, reach their audiences, and drive the visibility their news
              deserves.
            </p>
          </div>

          {/* Category section */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 justify-items-center"
          >
            {categories.map((category, index) => (
              <Link href={category.href} key={index}>
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-4 transition-transform duration-300"
                >
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
