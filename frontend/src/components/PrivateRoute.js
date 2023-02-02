import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom';

const PrivateRoute = ({component : Component , ...rest}) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
        userInfo ? <Outlet /> : 
            <Navigate to="/signin" />
            
        
    );
}

export default PrivateRoute