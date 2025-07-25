import React from "react";
import { Link } from "@/i18n/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const lang = locale === "en";

  return (
    <footer className="bg-[#21275c] text-white py-10">
      <div className="container mx-auto px-10">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-8 text-center ${
            lang ? "sm:text-left" : "sm:text-right"
          }`}
        >
          {/* وصف الموقع */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-bold">{t("siteName")}</h2>
            <p className="text-sm text-gray-300 leading-relaxed lg:max-w-[80%]">
              {t("description")}
            </p>
            <p className="text-sm text-gray-400">
              {t("email")}: support@mawthoqpost.com
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link
                  href={{ pathname: "/", locale }}
                  className="hover:underline"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/marketplace", locale }}
                  className="hover:underline"
                >
                  {t("marketplace")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/about", locale }}
                  className="hover:underline"
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/support", locale }}
                  className="hover:underline"
                >
                  {t("helpSupport")}
                </Link>
              </li>
            </ul>
          </div>

          {/* خدماتنا */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("more_info")}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link
                  href={{ pathname: "/privacy_policy", locale }}
                  className="hover:underline"
                >
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/terms_of_use", locale }}
                  className="hover:underline"
                >
                  {t("terms_of_use")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/refund_policy", locale }}
                  className="hover:underline"
                >
                  {t("refund_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/how_it_works", locale }}
                  className="hover:underline"
                >
                  {t("how_it_works")}
                </Link>
              </li>
            </ul>
          </div>

          {/* تابعنا */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("followUs")}</h3>
            <p className="text-sm text-gray-300">{t("stayConnected")}</p>
            <div className="flex gap-4 text-white text-lg justify-center sm:justify-start">
              <a
                href="https://www.facebook.com/people/%D9%85%D9%88%D8%AB%D9%88%D9%82-%D8%A8%D9%88%D8%B3%D8%AA-mawthoqpostcom/61561932255444/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="hover:text-gray-300" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="hover:text-gray-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="hover:text-gray-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="hover:text-gray-300" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="hover:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* الحقوق */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Mawthoqpost. {t("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
