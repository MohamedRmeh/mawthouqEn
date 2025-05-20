"use client";
import Image from "next/image";
import { FaCcPaypal, FaCcVisa, FaStripe } from "react-icons/fa";
import React, { useState } from "react";

const CheckoutSection = () => {
  const basePrice = 250;
  const extras = [
    { id: 1, label: "Extra Fast Publishing (2 days)", price: 50 },
    { id: 2, label: "Featured Placement", price: 80 },
    { id: 3, label: "Social Media Promotion", price: 40 },
    { id: 4, label: "Featured Placement", price: 80 },
  ];

  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleToggle = (id) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalPrice =
    basePrice +
    selectedExtras.reduce(
      (acc, id) => acc + extras.find((extra) => extra.id === id).price,
      0
    );
  return (
    <div className="mt-10">
      <div className="rounded-xl h-fit bg-[#f5f7fa p-4 border border-gray-200">
        <h2 className="text-2xl font-semibold text-[#21275c] mb-6 ">
          Checkout
        </h2>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between text-gray-800 font-medium">
            <span>Base Price</span>
            <span>${basePrice}</span>
          </div>

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
                  <span>{extra.label}</span>
                </div>
                <span className="text-gray-600">${extra.price}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between font-semibold text-lg pt-4 mt-6 border-t border-gray-200">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>

        <button className="mt-6 w-full bg-[#21275c] text-white py-3 rounded-lg hover:bg-[#1b1f4a] transition-colors">
          Proceed to Checkout
        </button>
      </div>
      {/* قسم الدفع */}
      <div className="flex justify-between text-6xl text-[#21275c] cursor-pointer mt-4 px-10">
        <FaCcPaypal title="PayPal" />
        <FaCcVisa title="Visa" />
        <FaStripe title="Stripe" />
      </div>
      <div className="flex items-center justify-center mt-10">
        <Image
          src="https://www.qtonix.com/images/Prose-Moneyback.jpg"
          width={150}
          height={100}
          alt="mony-back"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <div>
          <h1 className="font-bold mb-1">Languages</h1>
          <p className="underline text-blue-700">English</p>
        </div>
        <div>
          <h1 className="font-bold mb-1">Website Categories</h1>
          <p className="underline text-blue-700">Financial</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;
