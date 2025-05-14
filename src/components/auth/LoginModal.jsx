import React from "react";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg py-2 font-medium hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
