"use client";

import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";

const CheckoutModal = ({ onClose, selectedExtras = [], id }) => {
  const t = useTranslations("checkoutModal");
  const locale = useLocale();

  const modalRef = useRef();
  const imagesInputRef = useRef(null);

  const [articleText, setArticleText] = useState("");
  const [articleFile, setArticleFile] = useState(null);
  const [articleUrl, setArticleUrl] = useState("");
  const [articleImages, setArticleImages] = useState([]);

  const [loading, setLoading] = useState(false);
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

  const showAlert = (msg, type = "error") => {
    setAlertMessage(msg);
    setAlertType(type);
    setTimeout(() => setAlertMessage(""), 4000);
  };

  const isValidUrl = (value) => {
    try {
      const url = new URL(value);
      return !!url.protocol && !!url.hostname;
    } catch {
      return false;
    }
  };

  const handleArticleFileChange = (file) => {
    setArticleFile(file);
    if (file) setArticleUrl(""); // تنافي بين الملف والرابط
  };

  const handleArticleUrlChange = (value) => {
    setArticleUrl(value);
    if (value.trim()) setArticleFile(null); // تنافي بين الملف والرابط
  };

  // دمج اختيارات الصور مع القديمة + منع التكرار
  const handleImagesChange = (files) => {
    const picked = files ? Array.from(files) : [];
    if (picked.length === 0) return;

    setArticleImages((prev) => {
      const merged = [...prev, ...picked];
      const uniqueMap = new Map();
      merged.forEach((f) => {
        const key = `${f.name}-${f.size}-${f.lastModified}`;
        if (!uniqueMap.has(key)) uniqueMap.set(key, f);
      });
      return Array.from(uniqueMap.values());
    });

    // إعادة ضبط قيمة الإدخال للسماح باختيار نفس الملف لاحقًا
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  };

  // const removeImageAt = (index) => {
  //   setArticleImages((prev) => prev.filter((_, i) => i !== index));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // يجب: يا ملف يا رابط
    if (articleFile && articleUrl.trim()) {
      showAlert(t("both_file_and_url"));
      return;
    }
    if (!articleFile && !articleUrl.trim()) {
      showAlert(t("missing_file_or_url"));
      return;
    }
    if (articleUrl.trim() && !isValidUrl(articleUrl.trim())) {
      showAlert(t("invalid_url"));
      return;
    }

    const formData = new FormData();

    if (articleText) formData.append("notes_for_publisher", articleText);
    if (articleFile) formData.append("article_file", articleFile);
    if (articleUrl.trim()) formData.append("article_url", articleUrl.trim());

    formData.append("website_id", id);
    formData.append("order_type", "website");

    // صور متعددة اختيارية: article_images[0..n]
    if (articleImages.length > 0) {
      articleImages.forEach((img, i) => {
        formData.append(`article_images[${i}]`, img);
      });
    }

    // الإضافات كما هي
    const extrasIds = selectedExtras.map((extra) => extra.id);
    extrasIds.forEach((extraId, index) => {
      formData.append(`extra_features[${index}]`, extraId);
    });

    // ===== DEBUG LOG =====
    (function logFormData(fd) {
      console.groupCollapsed("🚀 Payload to backend (FormData)");
      for (const [key, value] of fd.entries()) {
        if (value instanceof File) {
          console.log(key, {
            name: value.name,
            type: value.type,
            size: value.size,
            lastModified: value.lastModified,
          });
        } else {
          console.log(key, String(value));
        }
      }
      console.groupEnd();
    })(formData);

    try {
      setLoading(true);
      const token = Cookies.get("token");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/orders`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      console.groupCollapsed("📡 Request");
      console.log("POST", url);
      console.log("Headers", headers);
      console.groupEnd();

      const response = await axios.post(url, formData, { headers });

      console.groupCollapsed("✅ Response (success)");
      console.log("Status:", response.status, response.statusText);
      console.log("Data:", response.data);
      console.groupEnd();

      showAlert(t("success_message"), "success");
      setTimeout(() => {
        setAlertMessage("");
        onClose();
      }, 4000);
    } catch (error) {
      console.groupCollapsed("🛑 Response (error)");
      if (error.response) {
        console.log(
          "Status:",
          error.response.status,
          error.response.statusText
        );
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);
      } else {
        console.log("Message:", error.message);
      }
      console.groupEnd();
      console.error("Submission error:", error);

      const fallback = t("failure_default");
      const serverMsg =
        error?.response?.data?.message && String(error.response.data.message);
      showAlert(`❌ ${serverMsg || fallback}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center px-4">
      {alertMessage && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut text-white ${
            alertType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          role="status"
          aria-live="polite"
        >
          {alertMessage}
        </div>
      )}

      <div
        ref={modalRef}
        className="bg-white rounded-[24px] p-6 sm:p-7 w-full max-w-lg shadow-2xl relative animate-fadeIn"
        dir={dir}
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 left-5 text-gray-400 hover:text-black text-2xl font-bold transition cursor-pointer"
          aria-label={t("close")}
          type="button"
        >
          ×
        </button>

        {/* العنوان والنص الإرشادي */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-[#21275c]">
            {t("confirm_your_checkout")}
          </h2>
          <p className="text-gray-500 text-sm">{t("balance_hint")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-gray-700">
          {/* إرسال المقال - ملف Word */}
          <div>
            <label className="block mb-2 font-semibold text-[#21275c]">
              {t("send_article_label")}
            </label>
            <input
              type="file"
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) =>
                handleArticleFileChange(
                  e.target.files ? e.target.files[0] : null
                )
              }
              className="w-full h-11 border border-gray-300 rounded-lg px-3 bg-white cursor-pointer"
              disabled={!!articleUrl.trim()}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("upload_word_hint")}
            </p>
          </div>

          {/* فاصل "أو" */}
          <div className="flex items-center gap-3 my-2 select-none">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm font-medium">{t("or")}</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* رابط المقال */}
          <div>
            <input
              type="url"
              placeholder={t("article_url_placeholder")}
              value={articleUrl}
              onChange={(e) => handleArticleUrlChange(e.target.value)}
              className="w-full h-11 border border-gray-300 rounded-lg px-3"
              disabled={!!articleFile}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("file_must_be_public")}
            </p>
          </div>

          {/* رفع صور المقال */}
          <div>
            <label className="block mb-2 font-semibold text-[#21275c]">
              {t("upload_images_label")} <span className="text-red-500">*</span>
            </label>
            <input
              ref={imagesInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => handleImagesChange(e.target.files)}
              className="w-full h-11 border border-gray-300 rounded-lg px-3 bg-white cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP</p>

            {/* عدّاد + قائمة الصور المختارة */}
            {articleImages.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-600">
                  {t("selected_images_count", { count: articleImages.length })}
                </p>

                {/* مثال لإظهار العناصر مع زر حذف (اختياري) */}
                {/* <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {articleImages.map((img, idx) => (
                    <div
                      key={`${img.name}-${img.size}-${img.lastModified}`}
                      className="flex items-center justify-between border rounded-lg px-2 py-1 text-sm"
                    >
                      <span className="truncate" title={img.name}>
                        {img.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImageAt(idx)}
                        className="text-red-600 hover:text-red-700 font-semibold px-2"
                        aria-label={t("delete_image")}
                      >
                        {t("delete")}
                      </button>
                    </div>
                  ))}
                </div> */}
              </div>
            )}
          </div>

          {/* ملاحظات للناشر */}
          <div>
            <label className="block mb-2 font-semibold text-[#21275c]">
              {t("notes_for_publisher_label")}
            </label>
            <textarea
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 min-h-[110px]"
              placeholder={t("notes_placeholder")}
            />
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#21275c] text-white py-3 rounded-xl font-semibold hover:bg-[#1b1f4a] transition cursor-pointer disabled:opacity-60"
          >
            {loading ? t("submit_processing") : t("submit_cta")}
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
            transform: scale(0.98);
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

export default CheckoutModal;
