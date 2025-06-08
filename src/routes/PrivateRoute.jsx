import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loader from '../pages/Loader/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const {loading, user} = UseAuth();

    const location = useLocation();

    if(loading) return <Loader></Loader>

    if(user && user.email) return children

    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;