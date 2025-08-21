import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/' element={<Login />} />
        </Routes>
    )
}

export default App