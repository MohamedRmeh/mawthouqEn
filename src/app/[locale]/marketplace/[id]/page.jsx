import Link from "next/link";
import Image from "next/image";
import CheckoutSection from "@/components/marketPlace/CheckoutSection";
import Recommended from "@/components/marketPlace/Recommended";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const page = () => {
  return (
    <section
      dir="ltr"
      className={`${inter.className} w-full px-4 md:px-20 mt-14 mb-20`}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="flex flex-col gap-10 md:col-span-2">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-4xl text-[#21275c] font-bold">
              Add press release to{" "}
              <span className="text-blue-700">Market Watch</span>
            </h1>
            <p className="text-slate-700 text-base md:text-lg">
              Get your press release published on Market Watch with our
              easy-to-use platform in just a few clicks
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-5 border border-gray-200">
            <Image
              width={320}
              height={320}
              src="/images/testImg.jpeg"
              alt="Market Watch"
              className="rounded-xl object-cover shadow-md w-full max-w-[320px] h-auto"
            />
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent md:h-[200px] md:w-px md:bg-gradient-to-b hidden md:block" />
            <div className="flex flex-col gap-3 text-gray-800 text-sm md:text-base text-center md:text-left">
              <Link
                href="https://www.marketwatch.com/"
                className="text-blue-600 underline font-semibold hover:text-blue-800 transition"
              >
                www.marketwatch.com
              </Link>
              <span className="font-medium">Press Release</span>
              <span>
                Published within{" "}
                <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                  5 business days
                </span>
              </span>
              <span>
                Estimated Views :{" "}
                <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                  7.1k
                </span>
              </span>
            </div>
          </div>

          <div className="text-base md:text-lg leading-relaxed text-gray-700">
            <p className="leading-relaxed mb-5">
              <strong>MarketWatch:</strong> Stock Market News - Financial News -
              MarketWatch
            </p>
            <p className="mb-5">
              MarketWatch publishes quality news stories of interest to the
              financial community and the general public.
            </p>
            <p className="mb-5">
              A press release must have a newsworthy announcement of company
              news, which should be evident in the headline and first paragraph
              and content focusing on the announcement being made. Contact
              information is required. The press release must contain
              information about the company or a contact person and also email
              address, city, and country.
            </p>
            <p className="mb-5">
              <strong>Publishing Guidelines:</strong> We reserve the right to
              reject any content that includes promotional language, lacks
              factual accuracy, contains misleading claims, or violates
              copyright policies. All submissions must be original and not
              previously published elsewhere. Articles must comply with our
              editorial standards and terms of service.
            </p>
            <p>
              <strong>Publishing Benefits:</strong> Featured on high-authority
              news platforms, permanent publication, fast approval time, and
              access to a targeted audience in the financial and business
              sectors.
            </p>
          </div>
        </div>

        {/* Checkout Section */}
        <CheckoutSection />
      </div>
      {/* Recommended Similar Websites */}
      <Recommended />
    </section>
  );
};

export default page;
