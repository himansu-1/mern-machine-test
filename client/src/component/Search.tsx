import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import Table from "./Table";


const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [employeChange, setEmployeChange ] = useState(false);
  
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
  
    const performSearch = async () => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
  
        try {
            const nameResponse = await axios.get(`http://localhost:1000/api/search?name=${query}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('auth-token')
                }
            });
            const designationResponse = await axios.get(`http://localhost:1000/api/search?designation=${query}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': Cookies.get('auth-token')
                }
            });
            
            const combine = [...nameResponse.data, ...designationResponse.data]
            // console.log(combine)
            const unique = combine.reduce((acc, current)=>{
              const x = acc.find(item=>item._id === current._id)
              if (!x) {
                acc.push(current)
              }
              return acc
            }, [])
            // console.log(unique)
            setResults(unique);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
  
    useEffect(() => {
        performSearch();
        // results.map((i,index)=>{
        //   console.log(index)
        //   console.log(i.name)
        //   // console.log(i[index].name)
  
        // })
    }, [query,employeChange]);

    return (
        <>
        <form className="form-inline d-flex flex-row-reverse bd-highlight mx-2">
        <input
          style={{ border: ".5px solid black", margin: "7px" }}
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-info btn-sm btn-outline-success"
          style={{ border: ".5px solid black", margin: "7px" }}
          type="submit"
        >
          Search
        </button>
      </form>

        {
            query?
      (<div className="card m-3 p-0 blur-background floating-search">
        <table className="table table-bordered m-0 bg-dark floating-search w-100">
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
              results.map((employee, index)=>{
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
                // <div className="w-100">{employee.name}</div>
                
              })
            }
          </tbody>
        </table>
      </div>):""
      }
        </>
    );
}
export default Search;