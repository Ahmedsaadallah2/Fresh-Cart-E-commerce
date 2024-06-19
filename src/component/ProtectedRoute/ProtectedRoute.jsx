import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../User.Context/User.context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
