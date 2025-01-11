import React from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import Home from '../pages/user/Home'
import AdminHome from '../pages/admin/AdminHome'
import ProtectedRoute from '../component/ProtectRoute/ProtectRoute'


ProtectedRoute
function router() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Home' element={<ProtectedRoute element={<Home/>}/>}/>
        

        {/* admin route */}
        <Route path='/adminHome' element={<ProtectedRoute element={<AdminHome/>}/>}/>

      </Routes>
      </Router>
    </div>
  )
}

export default router
