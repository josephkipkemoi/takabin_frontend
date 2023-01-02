import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import LoginComponent from './components/Auth/LoginComponent';
import Header from './components/Header/Header';
import LandingComponent from './components/Landing/LandingComponent';
import NavComponent from './components/Navigation/NavComponent';
import TopNavigation from './components/TopNavigation/TopNavigation';
import axios from './lib/Axios';
import ProfileComponent from './components/Profile/ProfileComponent';
import SignupComponent from './components/Auth/SignupComponent';
import HelpComponent from './components/Help/HelpComponent'
import Collector from './pages/Collector/Collector';
import Collectee from './pages/Collectee/Collectee';

import { WithProtected, WithPublic } from './hooks/routeProtection';
import Notification from './pages/Notification/Notification';


function App() {

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const checkIsAuth = async (token) => {
    if(token?.token) {
      setIsLoggedIn(true)
    }
    try {
      const res = await axios.get('api/user', {
        headers: {
                  'Authorization': token?.type + " " + token?.token
          }
      })
      setIsLoggedIn(true)
      setUser(res.data)
    } catch (error) {
      if(error.response.status === 401) {
        setUser(null)
      }
    }
    
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.authorization

    checkIsAuth(token)
  }, [])

  return (
    <>
        {Boolean(user?.id) === true && <TopNavigation/>}

        <Header/>  
     
        <Routes>
            <Route path='/' element={<LandingComponent user={user}/>}/>
            <Route path='/login' element={<LoginComponent />}/>
            <Route path='/register' element={<SignupComponent/>}/>
            <Route path='/collections' element={<Collectee user={user}/>}/>
            <Route path='/collector' element={<Collector/>}/>
            <Route path='/profile' element={<ProfileComponent/>}/>
            <Route path='/notifications' element={<Notification user={user}/>}/>
            <Route path='/help' element={<HelpComponent/>} />
        </Routes>

        <NavComponent user={user} /> 

    </>
  );
}

export default App;
