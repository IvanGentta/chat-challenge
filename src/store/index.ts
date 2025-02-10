// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import messagesReducer from "./slices/messagesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer, // Agrega el slice de mensajes
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
