'use client'
import React, { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import VerifyCodeModal from "./VerifyCodeModal";

const LoginModal = ({ isOpen, onClose, setRedictUrl }) => {
  const t = useTranslations("Login");
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userId, setUserId] = useState(null); // أو email إذا كنت تستعمله

  // هذا الجديد:
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        formData
      );

      const { token, redirect_url } = res.data;

      Cookies.set("token", token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      if (redirect_url) {
        setRedictUrl(redirect_url);
        localStorage.setItem("redirect_url", redirect_url);
      }

      onClose();
    } catch (err) {

      const errorMessage = err?.response?.data?.message;
      setError(errorMessage);

      if (err?.response?.data?.resend === true) {
        setUserId(err?.response?.data?.user_id); // أو استخدم email بدلاً من user_id إذا كان هذا ما تستخدمه
        setShowVerifyModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (showVerifyModal) {
    return (
      <VerifyCodeModal
        userId={userId}
        onClose={() => setShowVerifyModal(false)}
        onOpenLoginModal={() => {
          setShowVerifyModal(false);
        }}
      />
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center px-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-fadeIn"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-3xl font-bold transition cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#21275c]">
          {t("login")}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("email")}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("password")}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          <Link
            onClick={onClose}
            href="/reset-password"
            className="text-[15px] text-blue-600 font-medium underline"
          >
            {t("resetPassword")}
          </Link>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? t("loading") : t("login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
