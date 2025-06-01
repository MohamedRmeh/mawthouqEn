"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutSection from "@/components/marketPlace/CheckoutSection";
import Recommended from "@/components/marketPlace/Recommended";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/websites/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching website data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="w-full px-4 md:px-20 mt-14 mb-20 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-6 md:col-span-2">
            <div className="h-8 bg-gray-300 rounded w-3/4" />
            <div className="h-5 bg-gray-200 rounded w-2/3" />

            <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-5 border border-gray-200">
              <div className="w-full max-w-[320px] h-[200px] bg-gray-300 rounded-xl" />
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent md:h-[200px] md:w-px md:bg-gradient-to-b hidden md:block" />
              <div className="flex flex-col gap-3 text-sm md:text-base text-center md:text-left w-full">
                <div className="bg-gray-200 h-4 rounded w-2/3 mx-auto md:mx-0" />
                <div className="bg-gray-200 h-4 rounded w-1/2 mx-auto md:mx-0" />
                <div className="bg-gray-200 h-4 rounded w-3/4 mx-auto md:mx-0" />
              </div>
            </div>

            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>

          <div className="h-[400px] bg-gray-200 rounded-xl" />
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <div className="text-red-600 text-center mt-10">
        Failed to load website data.
      </div>
    );
  }

  return (
    <section
      dir="ltr"
      className={`${inter.className} w-full px-4 md:px-20 mt-14 mb-20`}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="flex flex-col gap-10 md:col-span-2">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl md:text-4xl text-[#21275c] font-bold leading-snug capitalize max-w-[95%]">
              Get featured on <span className="text-blue-700">{data.name}</span>{" "}
              — trusted by{" "}
              <span className="text-blue-700">{data.category}</span> leaders.
            </h1>

            <p className="text-slate-600 text-base md:text-lg">
              Boost your brand’s visibility by publishing on a trusted platform
              like {data.name}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-2xl p-5 border border-gray-200">
            <Image
              width={320}
              height={320}
              src={data.img || "/images/testImg.jpeg"}
              alt={data.name}
              className="rounded-xl object-cover shadow-md w-full max-w-[320px] h-auto"
            />
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent md:h-[200px] md:w-px md:bg-gradient-to-b hidden md:block" />
            <div className="flex flex-col gap-3 text-gray-800 text-sm md:text-base text-center md:text-left">
              <Link
                href={data.url}
                target="_blank"
                className="text-blue-600 underline font-semibold hover:text-blue-800 transition"
              >
                {data.url}
              </Link>
              <span className="font-medium">{data.content_type}</span>
              <span>
                Published within{" "}
                <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                  {data.avg_publish_time} business days
                </span>
              </span>
              <span>
                Estimated Views :{" "}
                <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-medium text-gray-700">
                  {data.views.toLocaleString()}
                </span>
              </span>
            </div>
          </div>

          <div className="text-base md:text-lg leading-relaxed text-gray-700">
            <p className="leading-relaxed mb-5">
              <strong>{data.name}:</strong> {data.category} - {data.language}
            </p>
            <p className="mb-5">{data.description}</p>
          </div>
        </div>

        {/* Checkout Section */}
        <CheckoutSection websiteData={data} />
      </div>

      {/* Recommended */}
      <Recommended id={id} />
    </section>
  );
};

export default Page;
