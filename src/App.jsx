import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import CreateNewAccount from './pages/CreateNewAccount'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<CreateNewAccount />} />
          <Route path='/login' element={<Login />}/>
          <Route  path='/home' element={<Home />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
