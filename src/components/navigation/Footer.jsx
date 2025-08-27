import React from "react";
import { Link } from "@/i18n/navigation";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { useLocale } from "next-intl";

const Footer = ({ texts = {} }) => {
  const locale = useLocale();
  const lang = locale === "en";

  // تفكيك مع قيم افتراضية لتفادي undefined
  const {
    siteName = "Mawthoqpost",
    description = "",
    email = "Email",
    followUs = "Follow Us",
    stayConnected = "",
    allRightsReserved = "All rights reserved.",
    more_info = "More Information",
    privacy_policy = "Privacy Policy",
    terms_of_use = "Terms of Use",
    refund_policy = "Refund Policy",
    how_it_works = "How does the platform work?",
    quickLinks: ql = {}, // كائن الروابط السريعة
    quickLinksHeading = "Quick Links", // عنوان القسم إن لم يوجد في النصوص
  } = texts;

  // تفكيك عناوين الروابط السريعة من الكائن الفرعي
  const {
    home = "Home",
    marketplace = "Marketplace",
    aboutUs = "About Us",
    helpSupport = "Help & Support",
  } = ql;

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
            <h2 className="text-xl font-bold">{siteName}</h2>
            <p className="text-sm text-gray-300 leading-relaxed lg:max-w-[80%]">
              {description}
            </p>
            <p className="text-sm text-gray-400">
              {email}: support@mawthoqpost.com
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{quickLinksHeading}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link
                  href={{ pathname: "/", locale }}
                  className="hover:underline"
                >
                  {home}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/marketplace", locale }}
                  className="hover:underline"
                >
                  {marketplace}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/about", locale }}
                  className="hover:underline"
                >
                  {aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/support", locale }}
                  className="hover:underline"
                >
                  {helpSupport}
                </Link>
              </li>
            </ul>
          </div>

          {/* المزيد من المعلومات */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{more_info}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link
                  href={{ pathname: "/privacy_policy", locale }}
                  className="hover:underline"
                >
                  {privacy_policy}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/terms_of_use", locale }}
                  className="hover:underline"
                >
                  {terms_of_use}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/refund_policy", locale }}
                  className="hover:underline"
                >
                  {refund_policy}
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/how_it_works", locale }}
                  className="hover:underline"
                >
                  {how_it_works}
                </Link>
              </li>
            </ul>
          </div>

          {/* تابعنا */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{followUs}</h3>
            <p className="text-sm text-gray-300">{stayConnected}</p>
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
          © {new Date().getFullYear()} {siteName}. {allRightsReserved}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
