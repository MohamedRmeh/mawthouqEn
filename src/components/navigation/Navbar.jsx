"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import {
  HiOutlineGlobeAlt,
  HiOutlineViewGrid,
  HiOutlineLogout,
} from "react-icons/hi";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const navLinks = [
    { href: "/", label: t("Home") },
    { href: "/marketplace", label: t("Marketplace") },
    { href: "/about", label: t("About Us") },
    { href: "/support", label: t("Help & Support") },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [redictUrl, setRedictUrl] = useState();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = pathname.startsWith("/en") ? "ar" : "en";
    const newPath = pathname.replace(/^\/(en|ar)/, `/${newLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    setRedictUrl(localStorage.getItem("redirect_url") || undefined);
  }, []);


const handleLogout = async () => {
  try {
   const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, {
      withCredentials: true, 
    });
    console.log(response)
    Cookies.remove("token");
    localStorage.removeItem("redirect_url");
    setRedictUrl(undefined);
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
    // ممكن تضيف إشعار هنا إذا حبيت
  }
};

  return (
    <>
      <nav className="bg-[#f5f7fa] top-0 z-50">
        <div className="flex items-center justify-between px-6 lg:px-26 py-4 lg:py-6 relative">
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/icons/png-we.png"
              alt="Company Logo"
              width={90}
              height={90}
              priority
            />
          </div>

          {/* Links - Center */}
          <ul className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  locale={locale}
                  className="relative text-[#737373] text-[17px] font-medium transition-colors duration-300 hover:text-black before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            {redictUrl ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 hover:bg-red-600/80 shadow-md text-[15px] cursor-pointer"
                >
                  <HiOutlineLogout size={20} />
                  <span>{t("Logout")}</span>
                </button>
                <Link
                  href={redictUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#2e3466] text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 hover:bg-[#1a1f4a] shadow-md text-[15px]"
                >
                  <HiOutlineViewGrid size={20} />
                  <span>{t("Dashboard")}</span>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="bg-blue-500 text-white font-medium px-6 py-1.5 rounded-lg transition-all duration-300 hover:bg-blue-600 shadow-sm cursor-pointer text-[15px]"
                >
                  {t("Login")}
                </button>
                <button
                  onClick={() => setSignupOpen(true)}
                  className="border border-slate-400 text-[#21275c] font-medium px-5 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#21275c]/30 shadow-sm cursor-pointer text-[15px]"
                >
                  {t("Sign Up")}
                </button>
              </>
            )}
            <button
              onClick={toggleLocale}
              className="text-[#737373] hover:text-black transition-colors duration-300 cursor-pointer"
            >
              <HiOutlineGlobeAlt size={26} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-screen py-4" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#737373] font-medium hover:text-black transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {redictUrl ? (
              <li className="flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 bg-red-600 text-white font-medium px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-red-700 shadow text-sm"
                >
                  <HiOutlineLogout size={20} />
                  {t("Logout")}
                </button>
                <Link
                  href={redictUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#2e3466] text-white font-medium px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#1a1f4a] shadow text-sm"
                >
                  <HiOutlineViewGrid size={20} />
                  {t("Dashboard")}
                </Link>
              </li>
            ) : (
              <li className="flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }}
                  className="text-[#737373] font-medium hover:text-black transition-colors duration-300"
                >
                  {t("Login")}
                </button>
                <button
                  onClick={() => {
                    setSignupOpen(true);
                    setMenuOpen(false);
                  }}
                  className="text-[#737373] font-medium hover:text-black transition-colors duration-300"
                >
                  {t("Sign Up")}
                </button>
              </li>
            )}

            <li>
              <button
                onClick={() => {
                  toggleLocale();
                  setMenuOpen(false);
                }}
                className="text-[#737373] font-medium hover:text-black transition-colors duration-300 cursor-pointer"
              >
                <HiOutlineGlobeAlt size={24} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <LoginModal
        setRedictUrl={setRedictUrl}
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
      <SignupModal
        setRedictUrl={setRedictUrl}
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
      />
    </>
  );
};

export default Navbar;
