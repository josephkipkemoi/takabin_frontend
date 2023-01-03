import { useEffect, useState } from "react"
import validateNumber from "../../hooks/validateNumber";
import axios from 'axios'
import { Link } from "react-router-dom";
import config from '../../config.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";

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
        <>
        <div className="container mt-5">
            <div className="card border-0">
                <div className="card-header bg-warning text-white">
                    <h2>Sign Up</h2>
                </div>
                <div className="card-body">
                    {errors.length > 0 && 
                    errors.map((err, i) => 
                    <span key={i} className="d-block alert alert-danger">
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 4 }} />
                        {err}
                    </span>) }
                    <div className="d-flex align-items-center justify-content-end mb-3">
                        <input id="user_role" type="checkbox" className="m-1" value={userRole} onChange={handleCheckbox}/>
                        <label htmlFor="user_role">Check box if you are a collector</label>
                    </div>
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
                                        <button 
                                            className="btn btn-primary" 
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
                </div>
            </div>
        </div>
        </>
    )
}

export default SignupComponent