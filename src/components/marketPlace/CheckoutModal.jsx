"use client";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutModal = ({ onClose, selectedExtras, id }) => {
  const modalRef = useRef();
  const [articleText, setArticleText] = useState("");
  const [articleFile, setArticleFile] = useState(null);
  const [loading, setLoading] = useState(false);



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

    if (!articleText && !articleFile) {
      alert("Please fill at least one of the fields.");
      return;
    }

    const formData = new FormData();

    if (articleText) {
      formData.append("article_text", articleText);
    }

    if (articleFile) {
      formData.append("article_file", articleFile);
    }

    formData.append("website_id", id);

    const extrasIds = selectedExtras.map((extra) => extra.id);
    extrasIds.forEach((extraId, index) => {
      formData.append(`extra_features[${index}]`, extraId);
    });

    try {
      setLoading(true);

      const token = Cookies.get("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

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

        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-[#21275c]">
          Confirm Your Checkout
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div>
            <label className="block mb-1 font-medium">Article Text</label>
            <textarea
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload File</label>
            <input
              type="file"
              onChange={(e) => setArticleFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#21275c] text-white py-3 rounded-xl font-semibold hover:bg-[#1b1f4a] transition cursor-pointer"
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
