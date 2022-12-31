import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

const LoginComponent = () => {
    const [userDetails, setUserDetails] = useState({
        phone_number: '',
        password: ''
    })

    const { phone_number, password } = userDetails

    const handleChange = (e) => setUserDetails(prev => ({...prev, [e.target.name] : e.target.value}))

    const handleSubmit = async () => {
        try {

            const res = await axios.post('http://localhost:8000/api/v1/login', userDetails)

            if(res.status === 200) {
               localStorage.setItem('user', JSON.stringify(res.data))
               window.location.href = '/'
            }

        } catch (error) {
            console.error(error?.message)
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
                    <div>
                        <label htmlFor="mobile_number" className="mb-2">Mobile number:</label>
                        <input 
                            id="mobile_number"
                            type="number" 
                            placeholder="Mobile number" 
                            className="form-control p-3 mb-3"
                            name="phone_number"
                            value={phone_number}
                            onChange={handleChange}
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
                        />
                    </div>
                    <Link className="float-end nav-link" to="/password-recover" name="passwordRecovery">
                        Forgot Password?
                    </Link>

                    <button 
                    className="btn btn-primary rounded-0 w-100 mt-3 p-2 shadow-sm" 
                    onClick={handleSubmit}
                    >
                        <i className="fa fa-sign-in text-white" aria-hidden="true"></i>
                        Login
                    </button>

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