import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle,faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Spinner } from "react-bootstrap"

const LoginComponent = () => {
    const [errors, setErrors] = useState([])
    const [isUserLoading, setIsUserLoading] = useState(null)

    const [userDetails, setUserDetails] = useState({
        phone_number: '',
        password: ''
    })

    const { phone_number, password } = userDetails

    const handleChange = (e) => setUserDetails(prev => ({...prev, [e.target.name] : e.target.value}))
 
    const handleSubmit = async () => {
        setIsUserLoading(true)
        try {

            const res = await axios.post('http://localhost:8000/api/v1/login', userDetails)

            if(res.status === 200) {
               setIsUserLoading(false)
               localStorage.setItem('user', JSON.stringify(res.data))
               window.location.href = '/'
            }

        } catch (error) {
            setIsUserLoading(false)
            console.error(error?.message)
            if(error.status !== 422) {
               setErrors(Object.values(error.response.data.errors).flat())
            }
        }
      
    }

    return (
        <>
            <div className="container mt-5">
                <div className="card border-0 shadow">
                    <div className="card-header bg-warning text-white">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">

                    {errors.length > 0 && 
                    errors.map((err, i) => 
                    <span key={i} className="d-block alert alert-danger">
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 4 }} />
                        {err}
                    </span>) }

                    <form onSubmit={e => e.preventDefault()}>                   
                        <label htmlFor="mobile_number" className="mb-2">Mobile number:</label>
                        <input 
                            id="mobile_number"
                            type="number" 
                            placeholder="Mobile number" 
                            className="form-control p-3 mb-3"
                            name="phone_number"
                            value={phone_number}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password" className="mb-2">Password:</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Enter password" 
                            className="form-control p-3 mb-3" 
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    <Link className="float-end nav-link" to="/password-recover" name="passwordRecovery">
                        Forgot Password?
                    </Link>

                    <button 
                    className="btn btn-primary rounded-0 mt-3 p-2 shadow-sm d-flex align-items-center" 
                    onClick={handleSubmit}
                    disabled={isUserLoading}
                    type="submit"
                    >
                        {isUserLoading ?
                        <>
                           <Spinner animation="grow" size="sm" style={{ marginRight: 4 }}/>
                           Loading...
                        </>
                        :
                            <>
                                <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: 4 }}/>
                                Login
                            </>
                        }
                     
                    </button>
                    </form>
                  

                    <div className="mt-3">
                        <p className="d-flex align-items-center">
                            Don't have an account?
                            <Link to="/register" className="btn">
                                Signup here
                            </Link>
                        </p>
                    </div>
                    </div>
                </div>
          
           
            </div>

        </>
    )
}

export default LoginComponent