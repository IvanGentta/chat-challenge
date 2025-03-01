"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerThunk } from "@/firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(registerThunk({ email, password })).unwrap();
      router.push("/SignIn");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="text-4xl font-serif text-black text-center mb-8">
        Chat Chatero Chateristico
      </h1>
      <div className="w-[300px] h-[400px] bg-chatExtra2 rounded-2xl border-8 border-chatBorder">
        <div className="flex flex-col w-full h-full items-center justify-center text-black p-4 space-y-6">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <form onSubmit={handleRegister} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 p-2 rounded-lg border-2 border-chatBorder"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 p-2 rounded-lg border-2 border-chatBorder"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-10 p-2 rounded-lg border-2 border-chatBorder"
              required
            />
            <button
              type="submit"
              className="w-fit h-auto self-center py-1 px-3 rounded-xl text-xl border-2 border-chatBorder bg-chatColor2"
            >
              Sign Up
            </button>
          </form>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <p className="text-center text-xl text-black mt-4">
          Already have an account?
          <br />
          <span
            onClick={() => router.push("/SignIn")}
            className="underline cursor-pointer decoration-blue-500"
          >
            Sign In here.
          </span>
        </p>
      </div>
    </div>
  );
}
