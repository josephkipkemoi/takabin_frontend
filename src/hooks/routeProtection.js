import { useEffect, useState } from "react";
import { Await, Navigate, redirect } from "react-router-dom"
import { AuthUser } from "./AuthUser";

export const WithPublic = ({isLoggedIn, children}) => {

  if(isLoggedIn) {
    return <Navigate to="/" replace />
   }
  
  return children
}

export const WithProtected = ({children, isLoggedIn}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const checkUserToken = () => {
  //   const user = JSON.parse(localStorage.getItem('user'))?.authorization
  //   console.log(user)
  // }
  

  useEffect(() => {
    if(isLoggedIn) {
      return redirect('/login')
    }

  }, [isLoggedIn])
   // return <WrappedComponent/>
  return children
};