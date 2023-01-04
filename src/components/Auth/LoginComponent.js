import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle,faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Spinner } from "react-bootstrap"
import LoginImg from '../../assets/img/log.jpg';

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
        <div className="bg-light row align-items-start m-1 mt-3 mb-3 rounded">
            <div className="col-lg-3 p-1 m-3 shadow">
                <div className="card border-0 d-flex justify-content-around">
                    <div className="card-header bg-white text-dark fw-bold border-0">
                       <h3>Login</h3> 
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
                        <div>
                            <div>
                                <label htmlFor="password" className="mb-2">Password:</label>
                                <Link className="float-end nav-link text-primary" to="/password-recover" name="passwordRecovery">
                                Forgot Password?
                                </Link>
                            </div>
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
                        </div>
                        <div>
                            <input type="checkbox" id="remember_me"/>
                            <label htmlFor="remember_me">Remember Me</label>
                        </div>
                  
                    <button 
                    className="btn btn-primary rounded-0 mt-3 p-3 w-100 shadow-sm d-flex justify-content-center align-items-center" 
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
                    <hr/>
                    <div className="text-center m-2">
                        <span>Or login with</span>
                        <div className="d-flex">
                            <button className="btn btn-outline-success p-3 w-100 m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                </svg>
                               <span style={{ marginLeft: 4 }}>Google</span> 
                            </button>
                            <button className="btn btn-outline-primary p-3 w-100 m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                                <span style={{ marginLeft: 4 }}>Facebook</span>                                 
                            </button>
                        </div>
                    </div>
                </div>         
            </div>
            <div className="col p-3">
                <div className="img-holder">
                    <img src={LoginImg} className="img-fluid rounded img-landing" alt="login-img"/>
                </div>
            </div>

        </div>
    )
}

export default LoginComponent