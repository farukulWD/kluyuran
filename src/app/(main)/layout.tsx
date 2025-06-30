import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";
interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
