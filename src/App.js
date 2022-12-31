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
import { WithProtected, WithPublic } from './hooks/routeProtection';
import CollectionComponent from './components/Collections/CollectionComponent';

function App() {

  const [user, setUser] = useState(null)

  const checkIsAuth = async (token) => {

    try {
      const res = await axios.get('api/user', {
        headers: {
                  'Authorization': token?.type + " " + token?.token
          }
      })

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
            <Route path='/login' element={<WithPublic user={user}><LoginComponent /></WithPublic>}/>
            <Route path='/register' element={<WithPublic user={user}><SignupComponent/></WithPublic>}/>
            <Route path='/collections' element={<WithProtected user={user}><CollectionComponent user={user}/></WithProtected>}/>
            <Route path='collector' element={<WithProtected user={user}></WithProtected>}/>
            <Route path='/profile' element={<WithProtected user={user}><ProfileComponent/></WithProtected>}/>
            <Route path='/help' element={<HelpComponent/>} />
        </Routes>

        <NavComponent user={user} /> 

    </>
  );
}

export default App;
