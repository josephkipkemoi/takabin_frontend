import { useState } from "react"
import './Auth.css';
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
        <div className ="auth-d-flex">
            <div>
                <button className="auth-btn auth-btn-light" onClick={handleAuthState} name="login">Login</button>
                <button className="auth-btn auth-btn-light" onClick={handleAuthState} name="signup">Signup</button>
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