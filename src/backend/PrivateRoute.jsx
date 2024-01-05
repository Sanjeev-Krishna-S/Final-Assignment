// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAdmin }) => {
  if (!isAdmin) {
    // Redirect to login if not an admin
    return <Navigate to="/" />;
  }

  // Render the component for admin
  return <Route element={element} />;
};

export default PrivateRoute;
