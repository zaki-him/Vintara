import React from "react";
import { Navigate } from "react-router";

interface ProtectedPropsRoute{
  children: React.ReactNode
}

const ProtectedRoute:React.FC<ProtectedPropsRoute> = ({ children }) => {
  const token = localStorage.getItem("token")

  if(!token){
    //redirects to login page
    return <Navigate to={'/sign-in'} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute