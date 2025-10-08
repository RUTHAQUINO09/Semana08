import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import * as AuthService from '../utils/auth';

const ProtectedRoute = ({ children, roles }) => {
  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();

  if (!currentUser) {
    // Si no está autenticado, redirigir a login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.some(role => currentUser.roles.includes(role))) {
    // Si el rol no está autorizado, redirigir a una página de no autorizado
    // o al dashboard. Por simplicidad, redirigimos al dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;