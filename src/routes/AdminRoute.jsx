import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import useUserRole from '../Hooks/useUserRole';
import Loader from '../pages/Loader/Loader';

const AdminRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const {role, roleLoading} = useUserRole();
    const location = useLocation();

    if(loading || roleLoading) return <Loader></Loader>;

    if(user && role === 'admin') return children;
    return <Navigate to="/" state={{ from: location }} replace ></Navigate>;
};

export default AdminRoute;