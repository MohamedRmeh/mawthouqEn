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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();

  const navLinks = [
    { href: "/", label: t("Home") },
    {
      label: t("Marketplace"),
      submenu: [
        { href: "/marketplace", label: t("Websites") },
        { href: "/socialmedia", label: t("socialMedia") },
      ],
    },
    { href: "/about", label: t("About Us") },
    { href: "/support", label: t("Help & Support") },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [redictUrl, setRedictUrl] = useState(undefined);

  // حالة فتح القائمة الفرعية للموبايل لكل قائمة تحتوي submenu
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const router = useRouter();
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    const token = Cookies.get("token");
    console.log(ref);
    if (ref && !token) {
      setSignupOpen(true);
    }
  }, []);

  const toggleLocale = () => {
    const newLocale = pathname.startsWith("/en") ? "ar" : "en";
    const newPath = pathname.replace(/^\/(en|ar)/, `/${newLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    setRedictUrl(localStorage.getItem("redirect_url") || undefined);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("redirect_url");
    setRedictUrl(undefined);
    router.push("/");
  };

  return (
    <>
      <nav className="bg-[#f5f7fa] top-0 z-50">
        <div className="flex items-center justify-between px-6 lg:px-6 py-4 lg:py-6 relative">
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
          <ul className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-6">
            {navLinks.map((link) =>
              link.submenu ? (
                <li key={link.label} className="relative group">
                  <span
                    className="relative text-[#737373] text-[17px] font-medium cursor-pointer transition-colors duration-300 group-hover:text-black before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 group-hover:before:w-full"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {link.label}
                  </span>
                  <ul
                    className={`absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:flex
                    flex-col bg-white shadow-lg rounded-md mt-2 py-2 min-w-[160px] z-50
                    transition-all duration-300 ease-in-out
                    before:absolute before:top-0 ${
                      locale === "en" ? "before:left-1/3" : ""
                    }  before:-translate-x-1/2 before:-translate-y-full
                    before:border-8 before:border-transparent before:border-b-white`}
                  >
                    {link.submenu.map((sublink) => (
                      <li key={sublink.label}>
                        <Link
                          href={sublink.href}
                          locale={locale}
                          className="block px-4 py-2 text-[15px] text-[#555555] hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-md"
                        >
                          {sublink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    locale={locale}
                    className="relative text-[#737373] text-[17px] font-medium transition-colors duration-300 hover:text-black before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Desktop Buttons */}
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
            aria-label="Toggle menu"
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
            {navLinks.map((link) =>
              link.submenu ? (
                <li
                  key={link.label}
                  className="w-full flex flex-col items-center"
                >
                  <button
                    onClick={() => toggleSubmenu(link.label)}
                    className="w-full flex justify-between items-center text-[#737373] font-medium px-6 py-2 hover:text-black transition-colors duration-300 focus:outline-none"
                    aria-expanded={!!openSubmenus[link.label]}
                    aria-controls={`submenu-${link.label}`}
                  >
                    <span>{link.label}</span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                        openSubmenus[link.label] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    id={`submenu-${link.label}`}
                    className={`w-full flex flex-col items-start overflow-hidden transition-max-height duration-300 ease-in-out ${
                      openSubmenus[link.label] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {link.submenu.map((sublink) => (
                      <li key={sublink.label} className="w-full">
                        <Link
                          href={sublink.href}
                          onClick={() => {
                            setMenuOpen(false);
                            setOpenSubmenus({});
                          }}
                          className="block w-full px-8 py-2 text-sm text-[#555555] hover:text-black transition-colors duration-300"
                        >
                          {sublink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.label} className="w-full">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-[#737373] font-medium px-6 py-2 hover:text-black transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}

            {redictUrl ? (
              <li className="flex flex-col items-center gap-4 w-full px-6">
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white font-medium px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-red-700 shadow text-sm w-full"
                >
                  <HiOutlineLogout size={20} />
                  {t("Logout")}
                </button>
                <Link
                  href={redictUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#2e3466] text-white font-medium px-4 py-1.5 rounded-lg transition-all duration-300 hover:bg-[#1a1f4a] shadow text-sm w-full mt-2"
                >
                  <HiOutlineViewGrid size={20} />
                  {t("Dashboard")}
                </Link>
              </li>
            ) : (
              <li className="flex flex-col items-center gap-4 w-full px-6">
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-start text-[#737373] font-medium hover:text-black transition-colors duration-300"
                >
                  {t("Login")}
                </button>
                <button
                  onClick={() => {
                    setSignupOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full text-start text-[#737373] font-medium hover:text-black transition-colors duration-300"
                >
                  {t("Sign Up")}
                </button>
              </li>
            )}

            <li className="w-full px-6">
              <button
                onClick={() => {
                  toggleLocale();
                  setMenuOpen(false);
                }}
                className="w-full text-left text-[#737373] font-medium hover:text-black transition-colors duration-300 cursor-pointer"
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
