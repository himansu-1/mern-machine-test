import React, { useContext, useEffect, useState } from 'react';
import EmployeeContext from '../contextstate/EmployeeContext';
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom';


const DashBord = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const context = useContext(EmployeeContext)
    const { admin } = context

    useEffect(() => {
        if(!Cookies.get('auth-token')){
            navigate("/login")
        }
    }, [location.pathname === ""])
    return (
        <>
        DashBord
        </>
    )
}


export default DashBord;