
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreateEmployee from './component/CreateEmployee'
import DashBord from './component/DashBord'
import EmployeeList from './component/EmployeeList'
import Login from './component/Login'
import Navbar from './component/Navbar'
import EditEmployee from './component/EditEmployee'

function App() {

  return (
    <>
      <Navbar/>
    <Routes>
      <Route exact path='/' element={<DashBord/>}/>
      <Route exact path='/employelist' element={<EmployeeList/>}/>
      <Route exact path='/createemployee' element={<CreateEmployee/>}/>
      <Route exact path='/edit/:EmployeeID' element={<EditEmployee/>}/>
      <Route exact path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App
