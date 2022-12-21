import { useState } from "react"
import axios from 'axios'
const LoginComponent = ({ handleAuthState }) => {
    const [userDetails, setUserDetails] = useState({
        phone_number: '',
        password: ''
    })

    const { phone_number, password } = userDetails

    const handleChange = (e) => setUserDetails(prev => ({...prev, [e.target.name] : e.target.value}))

    const handleSubmit = async () => {
        console.log(await axios.post('http://localhost:8000/api/v1/login', userDetails))
       
    }

    return (
        <div className="auth-d-flex">
            <h2>Login</h2>
            <div className="auth-d-flex">
                <input 
                    type="number" 
                    placeholder="Mobile number" 
                    className="auth-form-control"
                    name="phone_number"
                    value={phone_number}
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="auth-form-control" 
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <a href="#" name="passwordRecovery" onClick={handleAuthState}>
                    Forgot Password?
                </a>
            </div>

            <button className="auth-btn" onClick={handleSubmit}>Login</button>

            <div >
                <p className="auth-d-flex">
                    Don't have an account?
                    <a href="#" name="signup" onClick={handleAuthState}>
                        Signup here
                    </a>
                </p>
            </div>
        </div>
    )
}

export default LoginComponent