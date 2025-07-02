"use client";
import React, { useRef, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useTranslations } from "next-intl";

const CheckoutModalForm = ({
  onClose,
  selectedType,
  selectedExtras,
  socialId,
  totalPrice,
}) => {
  const t = useTranslations("checkoutModal");

  const modalRef = useRef();
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    if (!token) {
      setAlertMessage("⚠️ يجب تسجيل الدخول لإتمام العملية.");
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 4000);
      return;
    }

    if (!selectedType) {
      setAlertMessage("⚠️ يرجى اختيار نوع المحتوى أولاً.");
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 4000);
      return;
    }

    const formData = new FormData();
    formData.append("order_type", "social_account");
    formData.append("social_account_id", socialId);
    formData.append("social_content_type", selectedType);
    if (file) formData.append("social_content_file", file);
    if (notes) formData.append("notes_for_publisher", notes);

    try {
      setSubmitting(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlertMessage("✅ تم إرسال الطلب بنجاح!");
      setAlertType("success");
      setTimeout(() => {
        setAlertMessage("");
        onClose();
      }, 4000);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "❌ حدث خطأ أثناء إرسال الطلب.";
      setAlertMessage(`❌ ${errorMessage}`);
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center px-4">
      {alertMessage && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut text-white 
            ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {alertMessage}
        </div>
      )}

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

        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-[#21275c]">
          {t("confirm_your_checkout")} - ${totalPrice.toFixed(2)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div>
            <label className="block mb-1 font-medium">
              {t("notices_for_publisher")}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">{t("upload_file")}</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#21275c] text-white py-3 rounded-xl font-semibold hover:bg-[#1b1f4a] transition cursor-pointer"
          >
            {submitting ? t("processing") : t("continue_to_payment")}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 4s ease forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutModalForm;
