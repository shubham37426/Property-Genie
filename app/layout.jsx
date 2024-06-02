import React from "react";
import "@/assets/styles/globals.css";
import '@/components/Navbar'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Property-Genie",
  description: "Find your dream rental",
  keywords: "rental, affordable-rental, luxory apartments",
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
