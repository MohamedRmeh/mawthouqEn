"use client";
import React, { useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";

const VerifyCodeModal = ({ onClose, onOpenLoginModal, userId }) => {
  const t = useTranslations("Verify");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify`,
        {
          user_id: userId,
          code: code,
        }
      );

      setSuccessMessage("✅ الكود صحيح، يرجى تسجيل الدخول الآن");

      setTimeout(() => {
        setSuccessMessage("");
        onClose(); // إغلاق VerifyCodeModal
      }, 2500);
    } catch (err) {
      setError("رمز التحقق غير صحيح");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-3xl font-bold transition cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-[#21275c]">
          {t("enter-code")}
        </h2>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("verification-code")}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition"
          >
            {loading ? t("verifying") : t("verify")}
          </button>
        </form>
      </div>
      {successMessage && (
        <div className="fixed text-lg top-5 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fadeIn">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default VerifyCodeModal;
