"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLanguage } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#catalog", label: "Catalog" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
  { href: "#support", label: "Support" },
  { href: "#login", label: "Login" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#f5f7fa] top-0 z-50">
      <div className="flex items-center justify-between px-6 lg:px-48 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/icons/png-we.png"
            alt="Company Logo"
            width={90}
            height={90}
            priority
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-[#737373] font-medium transition-colors duration-300 hover:text-black before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="flex items-center text-[#737373] font-medium transition-colors duration-300 hover:text-black cursor-pointer">
              <FaLanguage size={24} />
            </button>
          </li>
        </ul>

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
          <li>
            <button className="flex items-center text-[#737373] font-medium hover:text-black transition-colors duration-300">
              <FaLanguage size={24} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
