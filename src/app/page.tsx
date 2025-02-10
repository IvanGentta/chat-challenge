"use client";
import { useState } from "react";
import SignIn from "./SignIn/page";
import SignUp from "./SignUp/page";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(true); // true para Sign In, false para Sign Up

  // Función para alternar entre Sign In y Sign Up
  const toggleView = () => setIsSignIn((prev) => !prev);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1 className="text-4xl font-serif text-black text-center mb-8">
        Chat Chatero Chateristico
      </h1>

      {isSignIn ? (
        <SignIn toggleView={toggleView} />
      ) : (
        <SignUp toggleView={toggleView} />
      )}
    </div>
  );
}
