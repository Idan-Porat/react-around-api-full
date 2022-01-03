import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = (props) => {
    const { loggedIn } = props;
    return (
        loggedIn ? <Outlet /> : <Navigate to='/signin' />
    )
}

export default ProtectedRoute; 