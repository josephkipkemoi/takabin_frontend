import { useState } from "react"
import { Link } from "react-router-dom";
import './Auth.css';
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function AuthComponent({ authState, handleAuthState }) {
  
    return (
        <div>            
            {authState === 'landing' && 
                <AuthButtonElements 
                    handleAuthState={handleAuthState}
                /> 
            }

            {authState === 'signup' && 
                <SignupComponent
                    handleAuthState={handleAuthState}
                /> 
            }

            {authState === 'login' && 
                <LoginComponent 
                    handleAuthState={handleAuthState}
                />       
            }

            {authState === 'passwordRecovery' &&
                <PasswordRecoveryComponent
                    handleAuthState={handleAuthState}
                />
            }
        </div>
    )
}

const AuthButtonElements = () => {
    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="d-flex">
                <Link 
                    className="btn btn-primary rounded-0 m-1 shadow-sm auth-link d-flex align-items-center justify-content-center" 
                    to="/login"
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span className="auth-link-name">Login</span>                    
                </Link>
                <Link 
                    className="btn btn-light rounded-0 m-1 shadow-sm auth-link d-flex align-items-center justify-content-center" 
                    to="/register"
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                   <span className="auth-link-name">Signup</span> 
                </Link>
            </div>          
        </div>
    )
}

const PasswordRecoveryComponent = ({ handleAuthState }) => {
    return (
        <div className="auth-d-flex">
            <h2>Recover Password</h2>
            <input className="auth-form-control" type="number" placeholder="Enter your mobile number" />
            <button className="auth-btn">Submit</button>
            <div>
                <a href="#" name="login" onClick={handleAuthState}>Login</a>
                <p>
                    Don't have an account? 
                    <a href="#" name="signup" onClick={handleAuthState}>Signup</a>
                </p>
            </div>
        </div>
    )
}