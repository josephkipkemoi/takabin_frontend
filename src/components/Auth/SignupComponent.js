import { useState } from "react"
import validateNumber from "../../hooks/validateNumber";
import config from '../../config.json';

const SignupComponent = ({ handleAuthState }) => {

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

    const handleSubmit = () => {
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
        
        // fetch(`${config.BACKEND_DEVELOPMENT_URL}/api/v1/collections/view`)
        // .then(res => res.json())
        // .then(data => console.log(data))
    }

    return (
        <div className="auth-d-flex">
            <h2>Sign Up</h2>
            <p>
                Register in 2 Easy Steps
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
            <div className="auth-d-flex">
                    <span>Step {signupSteps} of 2</span>
                    {error && <p><small>{error}</small></p>}
                    {signupSteps === 1 &&
                    <input 
                        required
                        name="phone_number"
                        type="number" 
                        placeholder="Mobile number" 
                        className="auth-form-control" 
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
                                className="auth-form-control" 
                                autoComplete="new-password"                       
                                onChange={handleChange} 
                                value={password}
                            />
                            <input 
                                name="confirm_password"
                                type="password" 
                                placeholder="Confirm Password" 
                                className="auth-form-control" 
                                autoComplete="new-password"                       
                                onChange={handleChange} 
                                value={confirm_password}
                            />
                        </>
                    }
                    {signupSteps === 1 && 
                    <button className="auth-btn" onClick={handleSteps}>
                        Submit
                    </button>
                    }
                    <div>
                        {signupSteps === 2 && 
                            <>
                                <button className="auth-btn" onClick={handlePreviousStep}>
                                    Go Back
                                </button>
                                <button className="auth-btn" onClick={handleSubmit}>
                                    Sign Up
                                </button>
                            </>                     
                        }
                    </div>   

                <p className="auth-d-flex">
                    Already have an account?
                    <a href="#" onClick={handleAuthState} name="login">Login here</a>
                </p>         
            </div>
            </form>
        </div>
    )
}

export default SignupComponent