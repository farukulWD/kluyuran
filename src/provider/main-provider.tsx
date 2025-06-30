"use client";

import { Toaster } from "@/components/ui/sonner";
import { store } from "@/store/store";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

function MainProvider({ children }: Props) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}

export default MainProvider;
