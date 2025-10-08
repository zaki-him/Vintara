import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProtectedRoute from './ProtectedRoute'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/product/:id' element={<ProductDetails />}></Route>
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }></Route>
      </Routes>
    </>
  )
}

export default App