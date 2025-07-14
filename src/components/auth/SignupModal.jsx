"use client";
// imports
import React, { useRef, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import VerifyCodeModal from "./VerifyCodeModal"; // ✅ إضافة المودال الجديد

const SignupModal = ({ isOpen, onClose, onOpenLoginModal }) => {
  const t = useTranslations("Register");
  const locale = useLocale();
  const modalRef = useRef();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userId, setUserId] = useState();

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

    const refParam = searchParams.get("ref");

    try {
      const queryString = refParam
        ? `?ref=${encodeURIComponent(refParam)}`
        : "";

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register${queryString}`,
        formData
      );
      setUserId(response.data.user_id);
      setShowVerifyModal(true);
    } catch (err) {
      setError(
        err?.response?.data?.email ||
          err?.response?.data?.phone ||
          "An error occurred during registration."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {!showVerifyModal && (
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
              {t("register")}
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("full-name")}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("email")}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("password")}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                dir={locale === "ar" ? "rtl" : "ltr"}
                placeholder={t("phone-number")}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              {error && <p className="text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
              >
                {loading ? t("loading") : t("register")}
              </button>
            </form>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <VerifyCodeModal
          userId={userId}
          onClose={() => {
            setShowVerifyModal(false);
            onClose();
          }}
          onOpenLoginModal={() => {
            setTimeout(() => {
              onOpenLoginModal();
            }, 200);
          }}
        />
      )}
    </>
  );
};

export default SignupModal;
