import { useEffect, useState } from "react"
import validateNumber from "../../hooks/validateNumber";
import axios from 'axios'
import { Link } from "react-router-dom";
import config from '../../config.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import RecycleImg from '../../assets/img/recycle.jpg';

const SignupComponent = () => {

    const [isUserLoading, setIsUserLoading] = useState(null)
    const [errors, setErrors] = useState([])
    const [userRole, setUserRole] = useState(config.COLLECTEE_USER_ROLE)
    const [services, setServices] = useState([])

    const [userDetails, setUserDetails] = useState({
        phone_number: '',
        password: '',
        confirm_password: '',
        role_id: null
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
        const userRegistrationUrl = 'http://localhost:8000/api/v1/register'
        const collectorRegistrationUrl = 'http://localhost:8000/api/v1/register/collector'

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
            setIsUserLoading(true)
            const res = await axios
            .post(`${userRole === config.COLLECTOR_USER_ROLE ? collectorRegistrationUrl : userRegistrationUrl}`, userDetails)
          
            if(res.status === 200) {
                setIsUserLoading(false)
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location.href = '/'
            }
           
           
        } catch (error) {
            console.error(error)
            setIsUserLoading(false)
            if(error.status !== 500) {
                setErrors(['Number already registered, Please login to continue'])
            }
        }
       
    }
    
    const handleCheckbox = (e) => {
       if(e.target.checked === true) {
            setUserRole(config.COLLECTOR_USER_ROLE)
       } else {
            setUserRole(config.COLLECTEE_USER_ROLE)
       }

    }

    const fetchServices = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/services");
            setServices(res.data)
        } catch (error) {
            console.error(error)
        }
       
    }

    const fetchRoles = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/roles?user_role=${userRole}`);
            setUserDetails(prev => ({...prev, role_id: res.data.id}))
        } catch (error) {
            console.error(error)
            if(error.status !== 422) {
                setErrors(Object.values(error.response.data.errors).flat())
             }
        }   
       
    }

    const handleService = (service_id) => {
        setUserDetails(prev => ({...prev , service_id}))
    }

    useEffect(() => {
        fetchServices()
        fetchRoles()
    }, [userRole])

    return (
        <div className="row mt-3 bg-light">
        <div className="col-lg-3 p-3 m-3">
            <div className="card border-0 shadow">
                <div className="card-header bg-white border-0 text-dark">
                    <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                    {errors.length > 0 && 
                    errors.map((err, i) => 
                    <span key={i} className="d-block alert alert-danger">
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 4 }} />
                        {err}
                    </span>) }
                  
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
                            <>
                              <input 
                                required
                                name="phone_number"
                                type="number" 
                                placeholder="Mobile number" 
                                className="form-control p-3 mb-3" 
                                autoComplete="phone-number"                       
                                value={phone_number}
                                onChange={handleChange}  
                              />
                                <div className="d-flex align-items-center justify-content-start mb-2">
                                    <input id="user_role" type="checkbox" className="m-1" value={userRole} onChange={handleCheckbox}/>
                                    <label htmlFor="user_role">Click here if you are a collector</label>
                                </div>
                              {userRole === config.COLLECTOR_USER_ROLE &&
                                <div className="d-flex flex-column mb-3">
                                    <label>Service Offered:</label>
                                    <div className="d-flex">
                                     {services.map((d,i) => <button key={i} onClick={() => handleService(d.id)} className="btn btn-outline-primary m-1">{d.service}</button>)}
                                    </div>
                                </div>
                              }
                            </>
                          
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
                            <button className="btn btn-primary rounded-0 mt-3 w-100 p-3" onClick={handleSteps}>
                                Submit
                            </button>
                            }
                            <div>
                                {signupSteps === 2 && 
                                    <>
                                        <button className="btn" onClick={handlePreviousStep}>
                                            Go Back
                                        </button>
                                        <button 
                                            className="btn btn-primary w-75 p-3 rounded-0" 
                                            onClick={handleSubmit} 
                                            disabled={isUserLoading}
                                        >
                                            {isUserLoading ?
                                                <>
                                                    <Spinner size="sm" animation="grow" style={{ marginRight: 4 }}/>
                                                    Loading...
                                                </>
                                                :
                                                <>
                                                   <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 4 }}/>
                                                    Sign Up
                                                </>
                                            }                                         
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
                    <hr/>
                    <div className="text-center m-2">
                        <span >Or signup with</span>
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
        </div>
        <div className="col d-flex justify-content-center p-3">
            <div className="img-container-signup">
                <img src={RecycleImg} alt="signup_img"/>
            </div>
        </div>
        </div>
    )
}

export default SignupComponent