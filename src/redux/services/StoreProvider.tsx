'use client'

import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
