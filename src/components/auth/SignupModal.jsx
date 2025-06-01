import React, { useRef, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import axios from "axios";
import Cookies from "js-cookie";

const SignupModal = ({ isOpen, onClose, setRedictUrl }) => {
  const t = useTranslations("Register");
  const locale = useLocale();
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        formData
      );

      const { token, redirect_url } = res.data;

      // تخزين التوكن في الكوكيز (مثلاً لمدة 7 أيام)
      Cookies.set("token", token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production", // يفضل في الإنتاج فقط
        sameSite: "lax",
      });

      // تخزين redirect_url في localStorage
      if (redirect_url) {
        setRedictUrl(redirect_url);
        localStorage.setItem("redirect_url", redirect_url);
      }

      onClose();

      // لو حابب تعيد التوجيه مباشرة:
      // if (redirect_url) window.location.href = redirect_url;
    } catch (err) {
      console.log(err);
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
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
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
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            dir={locale === "ar" ? "rtl" : "ltr"}
            placeholder={t("phone-number")}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
          {error && <p className="text-red-500 text-center mb-">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? t("loading") : t("register")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
