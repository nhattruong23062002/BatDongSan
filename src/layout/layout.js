import React from "react";
import Header from "../components/header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="max-w-1080px">
        {children}
      </main>
    </div>
  );
}

export default Layout;
