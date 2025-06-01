"use client";
import Image from "next/image";
import { FaCcPaypal, FaCcVisa, FaStripe } from "react-icons/fa";
import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

const CheckoutSection = ({ websiteData }) => {
  const t = useTranslations("checkout");

  const basePrice = parseFloat(websiteData?.price || 0);
  const commissionRate = 0.2;
  const extras = websiteData?.extra_features || [];
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleToggle = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const extrasTotal = selectedExtras.reduce((acc, id) => {
    const extra = extras.find((e) => e.id === id);
    return acc + (extra ? parseFloat(extra.price) : 0);
  }, 0);

  const subTotal = basePrice;
  const commission = subTotal * commissionRate;
  const totalWithCommission = subTotal + commission + extrasTotal;

  const handleCheckoutClick = () => {
    const token = Cookies.get("token"); // أو اسم الكوكي اللي تستخدمه
    if (!token) {
      setAlertMessage("⚠️ You must be logged in to proceed to checkout.");
      // تختفي الرسالة بعد 4 ثواني
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
          <div className="flex justify-between text-gray-800 font-medium">
            <span>{t("base_price")}</span>
            <span>${(basePrice * 1.2).toFixed(2)}</span>
          </div>

          {extras.length > 0 && (
            <div className="flex flex-col gap-3">
              {extras.map((extra) => (
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
                    ${parseFloat(extra.price).toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 pt-4 mt-6 border-t border-gray-200 text-gray-800">
          <div className="flex justify-between font-semibold text-lg">
            <span>{t("total")}</span>
            <span>${totalWithCommission.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckoutClick}
          className="mt-6 w-full bg-[#21275c] text-white py-3 rounded-lg hover:bg-[#1b1f4a] transition-colors cursor-pointer"
        >
          {t("proceed_to_checkout")}
        </button>
      </div>

      {/* Payment Icons */}
      <div className="flex justify-between text-6xl text-[#21275c] cursor-pointer mt-4 px-10">
        <FaCcPaypal title="PayPal" />
        <FaCcVisa title="Visa" />
        <FaStripe title="Stripe" />
      </div>

      {/* Website Image */}
      <div className="flex items-center justify-center mt-10">
        <Image
          src="https://www.qtonix.com/images/Prose-Moneyback.jpg"
          width={150}
          height={100}
          alt="money-back"
          className="object-cover"
        />
      </div>

      {/* Website Info */}
      <div className="flex flex-col gap-5 mt-5">
        <div>
          <h1 className="font-bold mb-1">{t("lang")}</h1>
          <p className="underline text-blue-700">
            {websiteData?.language || "N/A"}
          </p>
        </div>
        <div>
          <h1 className="font-bold mb-1">{t("website_category")}</h1>
          <p className="underline text-blue-700">
            {websiteData?.category || "N/A"}
          </p>
        </div>
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
