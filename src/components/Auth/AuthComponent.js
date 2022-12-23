import { useState } from "react"
import { Link } from "react-router-dom";
// import './Auth.css';
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

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

const AuthButtonElements = ({ handleAuthState }) => {
    return (
        <div className="d-flex justify-content-center mt-5">
            <div>
                <Link 
                    className="btn btn-primary rounded-0 m-1 shadow-sm" 
                    to="/login"
                >
                    Login
                </Link>
                <Link 
                    className="btn btn-light rounded-0 m-1 shadow-sm" 
                    to="/register"
                >
                    Signup
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