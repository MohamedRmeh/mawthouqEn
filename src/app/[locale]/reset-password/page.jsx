"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ResetPasswordPage = () => {
  const t = useTranslations("resetPassword");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/request-password-reset`,
        {
          email,
        }
      );

      // if (res.status === 200) {
      //   router.push("/check-your-email");
      // }
    } catch (err) {
      const message = err.response?.data?.message || t("unexpectedError");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-44 flex items-center justify-center bg-[#f5f7fa] p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {t("title")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("emailLabel")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t("emailPlaceholder")}
            />
          </div>

          {error && (
            <div className="text-red-600 bg-red-100 rounded-md p-2 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
