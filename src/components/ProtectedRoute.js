import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../utils/authUtils";

const ProtectedRoute = ({ role, children }) => {
    const user = decodeToken();

    if (!user || user?.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
