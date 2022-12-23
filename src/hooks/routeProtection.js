import { useEffect } from "react"
import { Navigate, redirect } from "react-router-dom"

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

    return (props) => {
      
      useEffect(() => {
        const user = JSON.parse(localStorage.getItem('auth-user'))
        console.log(user)
        // if(Boolean(user?.id) === false) {
        //      redirect('/')     
        // }
        // return undefined
    }, [])

      return <WrappedComponent {...props} />;
    };
};