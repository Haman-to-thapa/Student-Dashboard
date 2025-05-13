import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoutes from './Component/PrivateRoutes'
import Dashboard from './dashboard/Dashboard'
import AddStudent from './Component/AddStudentFrom'
import StudentDetails from './Component/StudentDetails'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-student' element={<PrivateRoutes><AddStudent /></PrivateRoutes>} />
        <Route path='/student/:id' element={<PrivateRoutes><StudentDetails /></PrivateRoutes>} />
      </Routes>
    </Router>
  )
}

export default App

