import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#21275c] text-white py-12">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-8 text-center sm:text-left">
          {/* وصف الموقع */}
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-bold">Mawthouq Post</h2>
            <p className="text-sm text-gray-300 leading-relaxed lg:max-w-[80%]">
              Mawthouq Post is your trusted partner for press release
              distribution. We help businesses amplify their message across top
              news platforms, build credibility, and drive real media coverage.
            </p>
            <p className="text-sm text-gray-400">
              Email: support@mawthouqpost.com
            </p>
            <p className="text-sm text-gray-400">Phone: +1 800 123 4567</p>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-4 ">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Help & Support

                </Link>
              </li>
            </ul>
          </div>

          {/* خدماتنا */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li className="hover:text-gray-100 transition-colors duration-200">
                Press Release Distribution
              </li>
              <li className="hover:text-gray-100 transition-colors duration-200">
                Guaranteed Media Coverage
              </li>
              <li className="hover:text-gray-100 transition-colors duration-200">
                Professional Content Writing
              </li>
              <li className="hover:text-gray-100 transition-colors duration-200">
                Multilingual Translation Services
              </li>
              <li className="hover:text-gray-100 transition-colors duration-200">
                SEO & Online Visibility Boost
              </li>
            </ul>
          </div>

          {/* تابعنا */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <p className="text-sm text-gray-300">
              Stay connected with us on social media:
            </p>
            <div className="flex gap-4 text-white text-lg justify-center sm:justify-start">
              <a
                href="https://facebook.com"
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
          © {new Date().getFullYear()} Mawthouq Post. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
