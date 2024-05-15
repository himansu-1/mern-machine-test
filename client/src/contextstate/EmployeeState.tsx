import React, { useState } from "react";
import EmployeeContext from "./EmployeeContext";
import Cookies from 'js-cookie'
import axios from "axios";

const EmployeeState = (props) =>{
    const [admin, setAdmin] = useState({})
    const [Employee, setEmployee] = useState([])

    const getEmployee = async ()=>{
        try {
            const response = await fetch('http://localhost:1000/api/getall',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('auth-token')
                }
            })
            const result = await response.json()
            setEmployee(result.employee)
            return result.employee
            // console.log(result.employee)
            
        } catch (error) {
            console.log(error)
        }
    }

    const getAdmin = async (token)=>{
        try {
            const response = await fetch('http://localhost:1000/api/admin/getAdmin',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                }
            })
            const result = await response.json()
            return result
        } catch (error) {
            console.log(error)
        }
    }
    const login = async (email, password)=>{
        try {
            const response = await fetch('http://localhost:1000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email, 
                    password: password
                })
            })

            const result = await response.json()
            return result
        } catch (error) {
            
        }
    }

    const editEmployee = async (id,credential)=>{
        try {
            const response = await fetch(`http://localhost:1000/api/update/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('auth-token')
                },
                body: JSON.stringify({
                    name: credential.name,
                    email: credential.email,
                    mobile: credential.mobile,
                    designation: credential.designation,
                    gender: credential.gender,
                    course: [
                        credential.course
                    ],
                    img: credential.img
                })
            })
            const result = await response.json()
            console.log(result)
            return result
            
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeByID = async (id)=>{
        try {
            const response = await fetch(`http://localhost:1000/api/getByID/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('auth-token')
                }
            })
            const result = await response.json()
            console.log(result)
            return result
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteEmployee = async (id)=>{
        try {
            const response = await fetch(`http://localhost:1000/api/delete/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('auth-token')
                }
            })
            const result = await response.json()
            return result
            
        } catch (error) {
            console.log(error)
        }
    }

    const createEmployee = async (credential)=>{
        try {
            const response = await fetch(`http://localhost:1000/api/insert`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('auth-token')
                },
                body: JSON.stringify({
                    name: credential.name,
                    email: credential.email,
                    mobile: credential.mobile,
                    designation: credential.designation,
                    gender: credential.gender,
                    course: credential.course,
                    img: credential.img
                })
            })
            const result = await response.json()
            console.log(result)
            return result
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <EmployeeContext.Provider
        value={{getEmployee, createEmployee, deleteEmployee, login, getAdmin, setAdmin, editEmployee, getEmployeeByID, admin, Employee, setEmployee}}
        >
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeState;