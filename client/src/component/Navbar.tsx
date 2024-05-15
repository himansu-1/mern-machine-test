import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmployeeContext from "../contextstate/EmployeeContext";
import Cookies from 'js-cookie'
import { Modal, Button } from "react-bootstrap";

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const context = useContext(EmployeeContext)
  const { admin, setAdmin, getAdmin } = context
  
  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);




  const handleLogout=()=>{
    setAdmin({})
    Cookies.remove('auth-token')
    navigate("/login")
  }
  useEffect(()=>{
    if(Cookies.get('auth-token')){
      getAdmin(Cookies.get('auth-token')).then(res=>{
        // setUser(res.result.name)
        setAdmin(res.result)
      })
    }else navigate("/login")
  },[])
  return (
    <>
      <nav className="navbar bg-info navbar-expand-sm w-100">
        <div className="container-fluid">
          <h1 className="navbar-brand px-2 py-0">
          <i className="fa-brands fa-pied-piper " style={{fontSize:"2rem"}}></i>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-2">
                <Link className={location.pathname==='/'?`nav-link active`:`nav-link`}  aria-current="page" to={"/"} >
                  Home
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className={location.pathname==='/employelist'?`nav-link active`:`nav-link`}  aria-current="page" to={"/employelist"} >
                  Employee List
                </Link>
              </li>
              {/* <li className="nav-item px-2">
                <Link className="nav-link active" aria-current="page" to={"/createemployee"} >
                  Create Employee
                </Link>
              </li> */}
            </ul>
            {/* <form className="d-flex" role="search"> */}
              {
                Cookies.get('auth-token') ?
                <>
                  <span className="nav-item px-5">
                    <Link className="nav-link " aria-current="page" to={"/employelist"} >
                      {admin.name}
                    </Link>
                  </span>
                  <button className="btn btn-outline-light p-1" onClick={handleShowLogout}>
                    Logout
                  </button> 
                </>:
                <></>
              }
            {/* </form> */}
          </div>
        </div>
      </nav>

      
      <Modal show={showLogout} style={{}}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Logout.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogout}>
            Candel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleLogout();
              handleCloseLogout();
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
