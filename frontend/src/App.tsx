import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App