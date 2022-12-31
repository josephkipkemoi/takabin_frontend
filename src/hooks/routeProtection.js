import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "../lib/Axios"

export const withPublic = (WrappedComponent) => {

    return  (props) => {

      useEffect(() => {
        const user = localStorage.getItem('auth-user')
        if(Boolean(user?.id) === false) {
            <Navigate to="/" replace/>          
        }
        return undefined

      }, [])

        return  <WrappedComponent {...props}/>
    }
}

export const withProtected = (WrappedComponent) => {
    const [user, setUser] = [null]
    return (props) => {
      const fetchUser = async (token) => {
        try {
          const res = await axios.get('api/user', {
            headers: {
                      'Authorization': token?.type + " " + token?.token
              }
          })
          setUser(res.data)
        } catch (error) {
          if(error.response.status === 401) {
               setUser(null)
          }
        }
        
      }
      useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))?.authorization
       
        fetchUser(token)

        return undefined
    }, [user])

    if(Boolean(user) === false) {
     return <Navigate to="/login" replace/>          
    }

      return <WrappedComponent {...props} />;
    };
};