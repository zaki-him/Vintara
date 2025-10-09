import React from 'react'
import { Navigate } from 'react-router'
import { jwtDecode } from 'jwt-decode'

interface ProtectedPropsRoute{
  children: React.ReactNode
}

const ProtectedAdminRoute: React.FC<ProtectedPropsRoute> = ({ children }) => {
  const token = localStorage.getItem("token")

  if(!token){
    return <Navigate to={'/sign-in'} replace/>
  }

  try {
    const decode: any = jwtDecode(token)

    if(decode.role !== "admin"){
      return <Navigate to={'/'} replace/>
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>
}

export default ProtectedAdminRoute