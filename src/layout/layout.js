import React from "react";

function Layout({ children }) {
  return (
    <div>
      <main className="max-w-800px">
        {children}
      </main>
    </div>
  );
}

export default Layout;
