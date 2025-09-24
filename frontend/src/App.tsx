import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import SignUp from './pages/SignUp'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
      </Routes>
    </>
  )
}

export default App