import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropertyDetail from "./pages/PropertyDetail";
import HomePage from "./pages/homePage";
import Layout from "./layout/layout";
import MapPage from "./pages/MapPage";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<PropertyDetail />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
