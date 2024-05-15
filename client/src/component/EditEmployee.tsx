import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeContext from "../contextstate/EmployeeContext";

const EditEmployee = () => {
  const context = useContext(EmployeeContext)
  const navigate = useNavigate()
  const { editEmployee, getEmployeeByID } = context
  const { EmployeeID } = useParams()
  const [credentials, setCredentials] = useState({});


  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleUpload= async (e)=>{
    const file = e.target.files[0]
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setCredentials({...credentials, img: reader.result});
    };
    reader.readAsDataURL(file);
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(credentials)
    editEmployee(EmployeeID,credentials).then(resolve=>{
      if (resolve.success) {
        alert("Successfully Employee account Edited")
        navigate('/employelist')
      }
    }).catch(rej=>{
      alert("Error")
    })
  }
  // console.log(EmployeeID)

  useEffect(() => {
    getEmployeeByID(EmployeeID).then(res=>{setCredentials(res.employee)})
  }, [EmployeeID])
  return (
    <>
      <form className="m-3" onSubmit={handleSubmit}>
        <h1 className="m-1 mb-2">Edit Employee</h1>
        <hr />

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Name here"
            name="name"
            value={credentials.name}
            onChange={onchange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email here"
            name="email"
            value={credentials.email}
            onChange={onchange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="number">Mobile No</label>
          <input
            type="number"
            className="form-control"
            id="number"
            placeholder="Enter Phone Number here"
            name="mobile"
            value={credentials.mobile}
            onChange={onchange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="selector">Designation</label>
          <select 
          className="form-control" 
          id="selector" 
          defaultValue={"choose"} 
          value={credentials.designation?credentials.designation:'choose'} 
          onChange={(e)=>{setCredentials({...credentials, designation:e.target.value})}}
          >
            <option value="choose" disabled>Choose here</option>
            <option  value='HR'>HR</option>
            <option  value='Manager'>Manager </option>
            <option  value='Sales'> Sales</option>
          </select>
        </div>

        <div className="d-flex my-3 form-group">
          Gender
          <div className="form-check mx-5">
            <input
              className="form-check-input"
              type="radio"
              id="maleRadio"
              name="radio"
              value={credentials.gender}
              checked={credentials.gender === "Male"}
              onChange={()=>{onchange;setCredentials({...credentials, gender:"Male"})}}
            />
            <label className="form-check-label" htmlFor="maleRadio">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radio"
              id="femaleRadio"
              value={credentials.gender}
              checked={credentials.gender === "Female"}
              onChange={()=>{onchange;setCredentials({...credentials, gender:"Female"})}}
            />
            <label className="form-check-label" htmlFor="femaleRadio">
              Female
            </label>
          </div>
        </div>

        <div className="d-flex my-2 form-group">
          Course
          <div style={{ display: "block" }} className="mx-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              value={'BCA'}
              name="BCA"
              checked={credentials.course === 'BCA'}
              onChange={(e)=>{setCredentials({...credentials, course:e.target.value})}}
            />
            <label className="form-check-label mx-1" htmlFor="exampleCheck1">
              BCA
            </label>
          </div>
          <div style={{ display: "block" }}>
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck2"
              value={'MCA'}
              name="MCA"
              checked={credentials.course === 'MCA'}
              onChange={(e)=>{setCredentials({...credentials, course:e.target.value})}}
            />
            <label className="form-check-label mx-1" htmlFor="exampleCheck2">
              MCA
            </label>
          </div>
          <div style={{ display: "block" }} className="mx-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck3"
              value={'MSC'}
              name="MSC"
              checked={credentials.course === 'MSC'}
              onChange={(e)=>{setCredentials({...credentials, course:e.target.value})}}
            />
            <label className="form-check-label mx-1" htmlFor="exampleCheck3">
              MSC
            </label>
          </div>
        </div>

        <div className="my-2 form-group w-100 row d-flex justify-content-around">
          <label htmlFor="fileInput">Upload Image:</label>
          <input
            type="file"
            className="form-control-file col-3"
            id="fileInput"
            accept=".jpeg .png .jpg" 
            onChange={handleUpload}
            style={{height:"50px"}}
            // onChange={handleFileChange}
          />
          {credentials.img && (
                      <div className="col-4" style={{display:"block"}}>
                        <p>Selected</p>
                        <img src={credentials.img} alt="Uploaded File" style={{width:"200px"}}/>
                      </div>
                    )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>    
  );
};

export default EditEmployee;

function convertToBase64(file){
  return new Promise((resolve,reject)=>{
    const filereader = new FileReader()
    filereader.readAsDataURL(file)
    filereader.onload=()=>{
      resolve(filereader.result)
    }
    filereader.onerror = (error)=>{reject(error)}
  })
}