import { useState } from "react"
import validateNumber from "../../hooks/validateNumber";
import axios from 'axios'
import Header from "../Header/Header";
import { Link, redirect } from "react-router-dom";
import NavComponent from "../Navigation/NavComponent";

const SignupComponent = () => {

    const [userDetails, setUserDetails] = useState({
        phone_number: '',
        password: '',
        confirm_password: ''
    })

    const [error, setError] = useState('')

    const { phone_number, password, confirm_password } = userDetails

    const [signupSteps, setSignupStep] = useState(1)

    const handleSteps = () => {
        if(Boolean(phone_number) === false) {
            setError('Mobile number field is required')
            return false
        }
        setError('')
        const validationResult = validateNumber(phone_number, setError)

        if(validationResult === false) {
            return false
        }

        if(signupSteps === 2) {
            return false
        }

        setSignupStep(prev => prev+=1)
    }

    const handleChange = (e) => setUserDetails(prev => ({...prev, [e.target.name]: e.target.value}))

    const handlePreviousStep = () => setSignupStep(prev => prev-=1)

    const handleSubmit = async () => {
        if(Boolean(password) === false) {
            setError('Password field is required')
            return false
        }

        setError('')

        if(password.split('').length < 4) {
            setError('Password too short')
            return false
        }

        setError('')

        if(password !== confirm_password) {
            setError('Passwords need to match')
            return false
        }

        setError('')
        
        try {
            const res = await axios.post('http://localhost:8000/api/v1/register?user_role=1', userDetails)

            if(res.status === 200) {
                localStorage.setItem('auth-user', JSON.stringify(res.data.user))
                localStorage.setItem('user-role', res.data.role)
                window.location = "/"
            }
           
           
        } catch (error) {
            console.error(error)
        }
       
    }

    return (
        <>
        <Header/>
        <div className="container mt-5">
            <div className="card border-0">
                <div className="card-header bg-warning text-white">
                    <h2>Sign Up</h2>
                </div>
                <div className="card-body">
                    <div className="text-center">
                    <span>
                        Register in 2 Easy Steps
                    </span>
                    </div>
                
                    <small>Step {signupSteps} of 2</small>
                    <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mt-1">                            
                            {error && <p><small>{error}</small></p>}
                            {signupSteps === 1 &&
                            <input 
                                required
                                name="phone_number"
                                type="number" 
                                placeholder="Mobile number" 
                                className="form-control p-3" 
                                autoComplete="phone-number"                       
                                value={phone_number}
                                onChange={handleChange}  
                            />
                            }
                            {signupSteps === 2 && 
                                <>
                                    <input 
                                        name="password"
                                        type="password" 
                                        placeholder="Enter Password" 
                                        className="form-control p-3 mb-3" 
                                        autoComplete="new-password"                       
                                        onChange={handleChange} 
                                        value={password}
                                    />
                                    <input 
                                        name="confirm_password"
                                        type="password" 
                                        placeholder="Confirm Password" 
                                        className="form-control p-3 mb-3" 
                                        autoComplete="new-password"                       
                                        onChange={handleChange} 
                                        value={confirm_password}
                                    />
                                </>
                            }
                            {signupSteps === 1 && 
                            <button className="btn btn-primary rounded-0 mt-3 w-100 p-2" onClick={handleSteps}>
                                Submit
                            </button>
                            }
                            <div>
                                {signupSteps === 2 && 
                                    <>
                                        <button className="btn" onClick={handlePreviousStep}>
                                            Go Back
                                        </button>
                                        <button className="btn btn-primary" onClick={handleSubmit}>
                                            Sign Up
                                        </button>
                                    </>                     
                                }
                            </div>   

                        <p className="d-flex align-items-center mt-3">
                            Already have an account?
                            <Link className="btn" to="/login">Login here</Link>
                        </p>         
                    </div>
                    </form>
                </div>
            </div>
        </div>
           <NavComponent/>
        </>
    )
}

export default SignupComponent