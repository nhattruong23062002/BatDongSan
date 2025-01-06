import React from "react";
import Footer from "./footer"
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
