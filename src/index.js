import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { 
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Collector from './pages/Collector/Collector';
import ProfileComponent from './components/Profile/ProfileComponent';
import HelpComponent from './components/Help/HelpComponent';
import LoginComponent from './components/Auth/LoginComponent';
import SignupComponent from './components/Auth/SignupComponent';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth-user'))
    setUser(user)
  }, [])
 
  if(!user) {
    return <Navigate to="/" replace />
  }
  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/login',
    element: <LoginComponent/>
  },
  {
    path: '/register', 
    element: <SignupComponent/>
  },
  {
    path: '/password-recover',
    element: <h1>Recover Password</h1>
  },
  {
    path: '/collector',
    element: <ProtectedRoute><Collector/></ProtectedRoute>
  },
  {
    path: '/profile',
    element: <ProtectedRoute><ProfileComponent/></ProtectedRoute>
  }, 
  {
    path: '/help',
    element: <HelpComponent/>
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
