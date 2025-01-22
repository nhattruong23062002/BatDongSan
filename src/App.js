import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropertyDetail from "./pages/PropertyDetail";
import MapPage from "./pages/MapPage";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import LayoutUser from "./layout/layoutUser";
import LayoutAdmin from "./layout/layoutAdmin";
import ManageUser from "./pages/ManageUser";
import ManageProperty from "./pages/ManageProperty";
import CreateProperty from "./pages/CreateProperty";
import EditProperty from "./pages/EditProperty";
import HomePage from "./pages/homePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Layout for User */}
        <Route element={<LayoutUser />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<PropertyDetail />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Layout for Admin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="manageUser" element={<ManageUser />} />
          <Route path="manageProperty" element={<ManageProperty />} />
          <Route path="createProperty" element={<CreateProperty />} />
          <Route path="editProperty/:id" element={<EditProperty />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
