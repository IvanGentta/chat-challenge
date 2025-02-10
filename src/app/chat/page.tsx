"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setMessages } from "@/store/slices/messagesSlice";
import { subscribeToMessages, sendMessage } from "@/firebase/firestore";
import { Message } from "../../../types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Chat() {
  const [messageText, setMessageText] = useState("");
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    email: string | null;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.messages.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref para el final de la lista

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email });
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToMessages((msgs) => {
      dispatch(setMessages(msgs));
    });
    return unsubscribe;
  }, [dispatch]);

  // Efecto para scrollear al último mensaje cada vez que cambian los mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageText.trim() === "" || !currentUser?.email) return; // No enviar mensajes vacíos
    try {
      await sendMessage(messageText, currentUser.email);
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <div className="flex-grow flex flex-col bg-chatExtra2 rounded-2xl border-8 border-chatBorder min-w-[300px] h-[500px] max-w-[800px] md:h-[650px]">
        {/* area mensajes */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={`mb-2 p-3 rounded-lg ${
                msg.user?.email === currentUser?.email
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start text-left"
              }`}
            >
              <p className="text-sm text-gray-500">
                {msg.user?.email} -{" "}
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString()
                  : "Unknown Time"}
              </p>
              <p className="text-black">{msg.text}</p>
            </div>
          ))}
          {/* div vacío para scrollear */}
          <div ref={messagesEndRef} />
        </div>

        {/* formulario para enviar mensaje */}
        <div className="flex items-center w-full p-2 text-black">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600"
          >
            <IoMdSend className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
