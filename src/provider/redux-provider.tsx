"use client";

import React from "react";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import MainProvider from "./main-provider";
import { persistor, store } from "@/store/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainProvider>{children}</MainProvider>
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
