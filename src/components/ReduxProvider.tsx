"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react"; // Added import for React
import { persistor, store } from "@/redux/store";

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
