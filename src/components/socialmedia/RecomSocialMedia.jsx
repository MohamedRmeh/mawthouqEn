"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Inter, Almarai } from "next/font/google";
import axios from "axios";
import { FaTiktok, FaCheckCircle } from "react-icons/fa";
import {
  SiInstagram,
  SiFacebook,
  SiX,
  SiYoutube,
  SiSnapchat,
} from "react-icons/si";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const almarai = Almarai({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

// Icons mapping
const platformIcons = {
  instagram: <SiInstagram className="text-pink-500 w-4 h-4" />,
  facebook: <SiFacebook className="text-blue-600 w-4 h-4" />,
  tiktok: <FaTiktok className="text-black w-4 h-4" />,
  twitter: <SiX className="text-black w-4 h-4" />,
  youtube: <SiYoutube className="text-red-600 w-4 h-4" />,
  snapchat: <SiSnapchat className="text-[#ffc131] w-4 h-4" />,
};

const RecomSocialMedia = ({ id }) => {
  const t = useTranslations("RecommendedSocial");
  const locale = useLocale();
  const router = useRouter();
  const fontClass = locale === "en" ? inter.className : almarai.className;

  const [socialAccounts, setSocialAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedAccounts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/social-accounts/${id}/recommended`
        );
        setSocialAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch recommended social accounts", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecommendedAccounts();
    }
  }, [id]);

  return (
    <section className={`${fontClass} py-10 mt-20`}>
      <div className="mx-auto">
        <h1 className="text-2xl sm:text-4xl font-semibold text-[#21275c] mb-10 text-center">
          {t("topContent")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {socialAccounts.map((account) => (
            <div
              key={account.id}
              onClick={() => router.push(`/socialmedia/${account.id}`)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 flex flex-col items-center text-center p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              style={{ width: "100%", height: "230px" }}
            >
              {/* Profile Image */}
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                {account?.account_image ? (
                  <img
                    src={account?.account_image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 shadow-sm" />
                )}
              </div>

              {/* Name & Verified */}
              <div className="flex items-center gap-2 justify-center mb-1">
                <h2 className="text-xl font-semibold truncate capitalize max-w-[180px]">
                  {account.account_name}
                </h2>
                {account.is_verified && (
                  <FaCheckCircle
                    className="text-green-500 text-lg"
                    title="Verified"
                  />
                )}
              </div>

              {/* Platform & Username */}
              <div className="flex items-center justify-center gap-1 text-gray-600 text-sm mb-2">
                {platformIcons[account.platform?.toLowerCase()] || (
                  <div className="text-gray-400">?</div>
                )}
                <a
                  href={account.profile_url}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate max-w-[160px]"
                  title={`@${account.username}`}
                >
                  @{account.username}
                </a>
              </div>

              {/* Followers */}
              <div className="text-sm text-gray-500 mb-2">
                👥 {account.followers_count?.toLocaleString() || 0} Followers
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecomSocialMedia;
