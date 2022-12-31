import { Navigate } from "react-router-dom"

export const WithPublic = ({user, children}) => {
  if(Boolean(user?.id) === true) {
    return <Navigate to="/" replace />
   }
  
  return children
}

export const WithProtected = ({user, children}) => {
  if(Boolean(user?.id) === false) {
    return <Navigate to="/login" replace />
   }
  
    return children
};