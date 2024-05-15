import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import EmployeeContext from "../contextstate/EmployeeContext";


const Table = (props) => {
  const context = useContext(EmployeeContext)
  const { deleteEmployee } = context

  const { key, img, name, sl, email, mobile, designation, gender, course, date, id, setEmployeChange, employeChange } = props;

  const [showLogout, setShowLogout] = useState(false);

  const handleCloseModal = () => setShowLogout(false);
  const handleShowModal = () => setShowLogout(true);

  const handleDelete = ()=>{
    console.log(id)
    deleteEmployee(id).then(res=>{
      if (res.success) {
        alert(res.result)
      }else alert("Something went Wrong")
    })
    handleCloseModal()
    setEmployeChange(!employeChange)
  }
  return (
    <>
      <tr>
        <th scope="row">{sl+1}</th>
        <td><img src={img?img:`https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg`} className="rounded " style={{width:"50px", height:"50px"}} alt={''}/></td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{mobile}</td>
        <td>{designation}</td>
        <td>{gender}</td>
        <td>{course}</td>
        <td>{date.slice(0,10)}</td>
        <td>
        <Link  className="btn btn-sm btn-info btn-outline-primary mx-1" to={`/edit/${id}`}>Edit</Link>
        <button type="button" className="btn btn-sm btn-info btn-outline-primary mx-1" onClick={handleShowModal}>Delete</button>    
        </td>
      </tr>
      
      <Modal show={showLogout} style={{}}>
        <Modal.Header>
          <Modal.Title>Deleting...</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Candel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Table;
