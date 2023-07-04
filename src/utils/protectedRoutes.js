import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { projectAuth } from 'src/firebase/firebase';

const ProtectedRoute = ({ children }) => {

    let location = useLocation();
    console.log(projectAuth.currentUser)
    const user = projectAuth.currentUser
    const userEmail = localStorage.getItem("Email");
    const userToken = localStorage.getItem("bearerToken");

    return userEmail && userToken ? (children) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )

    // if the user is not authenticated then redirect to the /login page
    // if (!projectAuth.currentUser ) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }
    // return <Outlet/>

};

export default ProtectedRoute;