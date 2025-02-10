"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginThunk, resetPasswordThunk } from "@/firebase/auth";

export default function SignIn({ toggleView }: { toggleView: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
      router.push("/chat");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccessMessage("");

    try {
      await dispatch(resetPasswordThunk(resetEmail)).unwrap();
      setSuccessMessage("Password reset email sent successfully.");
      setShowResetModal(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-[300px] h-[350px] bg-chatExtra2 rounded-2xl border-8 border-chatBorder">
      <div className="flex flex-col w-full h-full items-center justify-center text-black p-4 space-y-6">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 p-2 rounded-lg border-2 border-chatBorder"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 p-2 rounded-lg border-2 border-chatBorder"
          />
          <button
            type="submit"
            className="w-fit h-auto self-center py-1 px-3 rounded-xl text-xl border-2 border-chatBorder bg-chatColor2"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}
        <p
          onClick={() => setShowResetModal(true)}
          className="underline cursor-pointer decoration-blue-800 text-xl"
        >
          Forgot password?
        </p>
      </div>
      <p className="text-center text-xl text-black mt-4">
        New here?{" "}
        <span
          onClick={toggleView}
          className="underline cursor-pointer decoration-blue-500"
        >
          Sign Up here.
        </span>
      </p>
      {/* Modal para Restablecer Contraseña */}
      {showResetModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black">
          <div className="bg-white p-6 rounded-lg shadow-md w-[300px]">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full h-10 p-2 rounded-lg border-2 border-chatBorder mb-4"
            />
            <button
              onClick={handleResetPassword}
              className="w-full py-2 px-3 rounded-lg text-white bg-blue-600"
            >
              Send Reset Email
            </button>
            <button
              onClick={() => setShowResetModal(false)}
              className="w-full mt-2 py-2 px-3 rounded-lg text-white bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
