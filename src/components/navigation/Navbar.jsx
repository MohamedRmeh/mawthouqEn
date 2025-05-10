"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#catalog", label: "Marketplace" },
  { href: "#about", label: "About Us" },
  { href: "#support", label: "Help & Support" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
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
                className="relative text-[#737373] text-[17px] font-medium transition-colors duration-300 hover:text-black before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons - Right */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login">
            <button className="bg-blue-500 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 shadow-sm cursor-pointer">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="border border-[#21275c] text-[#21275c] font-medium px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#21275c]/10 shadow-sm cursor-pointer">
              Sign Up
            </button>
          </Link>
          <button className="text-[#737373] hover:text-black transition-colors duration-300 cursor-pointer">
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
          <li className="flex items-center flex-col gap-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-[#737373] font-medium hover:text-black transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-[#737373] font-medium hover:text-black transition-colors duration-300"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <button className="text-[#737373] font-medium hover:text-black transition-colors duration-300 cursor-pointer">
              <HiOutlineGlobeAlt size={24} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
