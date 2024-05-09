import React, { useContext, useEffect, useState } from "react";
import "../style/Login.css";
import EmployeeContext from "../contextstate/EmployeeContext";
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
  const context = useContext(EmployeeContext);
  const { login, getAdmin, setAdmin } = context;
  
  const navigate = useNavigate()
  const location = useLocation()
  const [Credential, setCredential] = useState({email:"",password:""})

  const onchange = (e)=>{
    setCredential({...Credential,[e.target.name]:e.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    login(Credential.email,Credential.password)
    .then((resolve: any)=>{
        Cookies.set('auth-token',resolve.authToken,{expires:7, secure: true})
        getAdmin(resolve.authToken)
        .then(resolve=>{
            setAdmin(resolve.result)
            console.log(resolve)
        })
        navigate('/')
        // console.log(resolve)
    })
    .catch((reject: any)=>{console.log(reject)})
  }

useEffect(() => {
    if (Cookies.get('auth-token')) {
        alert("Your are Already Login")
        navigate("/")
    }
}, [location.pathname==='/login'])

  return (
    <>
      <div className="body">
        <div className="container">
          <div className="card">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="username"
                placeholder="Enter Email Here"
                required
                onChange={onchange}
                value={Credential.email}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password Here"
                required
                onChange={onchange}
                value={Credential.password}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
