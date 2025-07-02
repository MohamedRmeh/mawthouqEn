"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CheckYourEmailPage = ({ searchParams }) => {
  const t = useTranslations("check-email");
  //   const searchParams = useSearchParams();
  const router = useRouter();

  const tokenFromUrl = searchParams?.token || "";
  const emailFromUrl = searchParams?.email || "";

  console.log(tokenFromUrl, emailFromUrl);

  const [email, setEmail] = useState(emailFromUrl);
  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !email) {
      setError(t("missing_token_or_email"));
      return;
    }

    if (password !== passwordConfirmation) {
      setError(t("passwords_not_match"));
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          email,
          token,
          password,
          password_confirmation: passwordConfirmation,
        }
      );
      router.push("/");
      setSuccess(t("password_reset_success"));
    } catch (err) {
      setError(err.response?.data?.message || t("password_reset_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-28 bg-[#f5f7fa] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("title")}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("new_password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {t("confirm_password")}
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded text-sm text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 bg-green-100 p-2 rounded text-sm text-center">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckYourEmailPage;
