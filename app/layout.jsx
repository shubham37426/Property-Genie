import React from "react";
import "@/assets/styles/globals.css";
import '@/components/Navbar'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
export const metadata = {
  title: "Property-Genie",
  description: "Find your dream rental",
  keywords: "rental, affordable-rental, luxory apartments",
};
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
    </AuthProvider>
  );
};

export default MainLayout;
