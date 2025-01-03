import React from "react";
import Footer from "./footer"; // Đảm bảo Footer được import đúng đường dẫn

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Phần nội dung của từng trang */}
      <div className="flex-grow">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
