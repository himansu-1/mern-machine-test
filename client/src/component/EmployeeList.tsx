import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Table from "./Table";
import EmployeeContext from "../contextstate/EmployeeContext";
import Search from "./Search";

const EmployeeList = () => {
  const context = useContext(EmployeeContext);
  const { getEmployee, Employee, setEmployee } = context;
  const [tempEmp, setTempEmp] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const [employeChange, setEmployeChange] = useState(false)

  // const sort = ()=>{
  //   let sorted = [...tempEmp].sort((a, b) => a.name.localeCompare(b.name));
  //   setTempEmp([...sorted])
  //   setEmployeChange(!employeChange)
  //   console.log(tempEmp)
  // }

  useEffect(() => {
    if (!Cookies.get('auth-token')) {
      navigate("/login")
    } else {
      getEmployee(Cookies.get('auth-token')).then(res => {
        setTempEmp(res)
      })
    }
    console.log(tempEmp)
  }, [employeChange])
  return (
    <>
      <header className="w-100 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'rgb(234 218 116)' }}>
        {/* <div>          
        <label className="dropdown">
          <div className="dd-button">
            Dropdown
          </div>
          <input type="checkbox" className="dd-input" id="test"/>

          <ul className="dd-menu" style={{zIndex:'1'}}>
            <li onClick={sort}>By Name</li>
            <li>By Designation</li>
            <li>By Course</li>
          </ul>
        </label>
        </div> */}

        <div className="d-flex justify-content-between align-items-center">
          <div className="px-5" >Total Employee: {Employee.length}</div>
          <Link className="nav-link active px-5" aria-current="page" to={"/createemployee"} >
            <button className="btn">Create Employee</button>
          </Link>
        </div>

      </header>

      <Search />

      <div className="card m-3 p-0" style={{ width: "97vw" }}>
        <table className="table table-bordered m-0">
          <thead className="thead-info">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Designation</th>
              <th scope="col">Gender</th>
              <th scope="col">Course</th>
              <th scope="col">Create Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              tempEmp.map((employee, index) => {
                return <Table
                  key={employee._id}
                  sl={index}
                  id={employee._id}
                  img={employee.img}
                  name={employee.name}
                  email={employee.email}
                  mobile={employee.mobile}
                  designation={employee.designation}
                  gender={employee.gender}
                  course={employee.course}
                  date={employee.date}
                  setEmployeChange={setEmployeChange}
                  employeChange={employeChange}
                />

              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
