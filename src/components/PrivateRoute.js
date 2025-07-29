import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserPermissions } from '../store/authSlice';

const PrivateRoute = ({ children, requiredPermission }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userPermissions = useSelector(selectUserPermissions);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !userPermissions.includes('all') && !userPermissions.includes(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute; 