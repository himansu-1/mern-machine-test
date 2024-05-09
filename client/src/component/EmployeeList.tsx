import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Table from "./Table";
import EmployeeContext from "../contextstate/EmployeeContext";

const EmployeeList = () => {
  const context = useContext(EmployeeContext);
  const { getEmployee, Employee } = context;

  const location = useLocation()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState([])

  useEffect(() => {
    if(!Cookies.get('auth-token')){
        navigate("/login")
    }else{
      getEmployee(Cookies.get('auth-token'))
      // console.log(Employee)
    }
  },[location.pathname === '/employest'])
  return (
    <>
      <form className="form-inline d-flex flex-row-reverse bd-highlight mx-2">
        <input
          className=""
          style={{ border: ".5px solid black", margin: "7px" }}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-info btn-sm btn-outline-success"
          style={{ border: ".5px solid black", margin: "7px" }}
          type="submit"
        >
          Search
        </button>
      </form>


            


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
              Employee.map((employee, index)=>{
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
                />
                // <div className="w-100">{employee.name}</div>
                
              })
            }
            {/* <Table 
            key='1'
            sl='1'
            img='https://picsum.photos/200' 
            name='name'
            email='email'
            mobile='mobile'
            designation='designation'
            gender='gender'
            course='course'
            date='date'
            />
            <Table 
            key='1'
            sl='1'
            img='https://picsum.photos/100' 
            name='name'
            email='email'
            mobile='mobile'
            designation='designation'
            gender='gender'
            course='course'
            date='date'
            />
            <Table 
            key='1'
            sl='1'
            img='https://picsum.photos/300' 
            name='name'
            email='email'
            mobile='mobile'
            designation='designation'
            gender='gender'
            course='course'
            date='date'
            /> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
