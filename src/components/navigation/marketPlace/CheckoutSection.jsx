"use client";
import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const CheckoutSection = ({ websiteData }) => {
  const t = useTranslations("checkout");

  const basePrice = parseFloat(websiteData?.price || 0);
  const commissionRate = parseFloat(websiteData?.tax_percentage || 0); // مثال: 0.1 = 10%
  const extras = websiteData?.extra_features || [];

  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // دالة موحدة لإضافة الضريبة/العمولة
  const withTax = (amount) => {
    const n = parseFloat(amount || 0);
    return n * (1 + commissionRate);
  };

  const handleToggle = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // مجموع أسعار الإضافات المختارة قبل/بعد الضريبة
  const extrasSubtotal = selectedExtras.reduce((acc, id) => {
    const extra = extras.find((e) => e.id === id);
    return acc + (extra ? parseFloat(extra.price) : 0);
  }, 0);

  // التوتال النهائي: (الأساس + الإضافات المختارة) بعد الضريبة
  const totalWithTax = withTax(basePrice + extrasSubtotal);

  const handleCheckoutClick = () => {
    const token = Cookies.get("token");
    if (!token) {
      setAlertMessage("⚠️ You must be logged in to proceed to checkout.");
      setTimeout(() => setAlertMessage(""), 4000);
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="mt-10 relative">
      {/* Alert Message */}
      {alertMessage && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut">
          {alertMessage}
        </div>
      )}

      {showModal && (
        <CheckoutModal
          id={websiteData.id}
          selectedExtras={extras.filter((e) => selectedExtras.includes(e.id))}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="rounded-xl h-fit p-4 border border-gray-200">
        <h2 className="text-2xl font-semibold text-[#21275c] mb-6">
          {t("checkout")}
        </h2>

        <div className="mb-6 space-y-4">
          {/* سعر الأساس مع الضريبة */}
          <div className="flex justify-between text-gray-800 font-medium">
            <span>{t("base_price")}</span>
            <span>${withTax(basePrice).toFixed(2)}</span>
          </div>

          {/* الإضافات بأسعار شاملة للضريبة */}
          {extras.length > 0 && (
            <div className="flex flex-col gap-3">
              {extras.map((extra) => {
                const price = parseFloat(extra.price || 0);
                return (
                  <label
                    key={extra.id}
                    className="flex justify-between items-center text-sm text-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(extra.id)}
                        onChange={() => handleToggle(extra.id)}
                        className="accent-blue-600 w-5 h-5"
                      />
                      <span>{extra.title}</span>
                    </div>
                    <span className="text-gray-600">
                      ${withTax(price).toFixed(2)}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* الإجمالي النهائي بعد الضريبة */}
        <div className="space-y-2 pt-4 mt-6 border-t border-gray-200 text-gray-800">
          <div className="flex justify-between font-semibold text-lg">
            <span>{t("total")}</span>
            <span>${totalWithTax.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckoutClick}
          className="mt-6 w-full bg-[#21275c] text-white py-3 rounded-lg hover:bg-[#1b1f4a] transition-colors cursor-pointer"
        >
          {t("proceed_to_checkout")}
        </button>
      </div>

      {/* Tailwind animation for fadeInOut */}
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
      `}</style>
    </div>
  );
};

export default CheckoutSection;
