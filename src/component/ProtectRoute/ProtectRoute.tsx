import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProtectedRouteProps } from '../../Interfaces/components';
import { userState } from '../../Interfaces/slice';



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user } = useSelector((state: { user: userState }) => state.user);
    const isAuthenticated = !!user; 
   return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
