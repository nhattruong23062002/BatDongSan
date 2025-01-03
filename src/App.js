import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropertyDetail from "./pages/PropertyDetail";
import Layout from "./components/Layout"; // Import Layout

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/detail" element={<PropertyDetail />} />
          {/* Thêm các route khác nếu cần */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
